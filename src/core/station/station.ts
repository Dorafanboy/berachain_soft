import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    formatUnits,
    http,
    PrivateKeyAccount,
    PublicClient,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../middlewares/logger/logger';
import { berachain } from '../../config';
import { addTextMessage } from '../../middlewares/telegram/telegramBot';
import { validators, stationContract, bgtBalanceToken } from './stationData';
import { erc20ABI } from '../../abis/erc20';
import { berpsABI } from '../../abis/berps';

export async function delegateBGT(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль делегирование BGT на STATION`);

    let publicClient!: PublicClient;
    publicClient = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const amount = (await publicClient.readContract({
        address: bgtBalanceToken,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address],
    })) as bigint;

    if (amount == BigInt(0)) {
        printInfo(`Баланс BGT равен нулю, нечего делегировать.`);
        return false;
    }

    const randomValidator = validators[Math.floor(Math.random() * validators.length)];

    printInfo(`Произвожу делегирование ${formatUnits(amount, 18)} BGT, validator - ${randomValidator}`);

    const data = encodeFunctionData({
        abi: berpsABI,
        functionName: 'delegate',
        args: [randomValidator, amount],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const preparedTransaction = await walletClient.prepareTransactionRequest({
        account,
        to: stationContract,
        data: data,
    });

    const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
        printError(`Произошла ошибка во время выполнения делегирование BGT на STATION - ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения делегирование BGT на STATION - ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅STATION: delegate ${formatUnits(amount!, 18)} BGT <a href='${url}'>link</a>`);
        return true;
    }

    return false;
}
