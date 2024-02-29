import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    formatEther,
    formatUnits,
    http,
    parseUnits,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../middlewares/logger/logger';
import { approveInfinity, assetOut, wBTCContract } from '../bex/bexData';
import { BendConfig, berachain, Config } from '../../config';
import { calculateRimmedAmount, getValue, replaceDigitsWithZeros } from '../../middlewares/utils/utils';
import { delay } from '../../middlewares/delayer/delayer';
import { erc20ABI } from '../../abis/erc20';
import { addTextMessage } from '../../middlewares/telegram/telegramBot';
import { bendContract } from './bendData';
import { bendABI } from '../../abis/bend';

export async function bendSupply(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль supply на BEND`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для закидывания wBTC на BEND. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести закидывание wBTC на BEND`);

        value = await getValue(
            client,
            account.address,
            BendConfig.wBTCDepositRange.range,
            BendConfig.wBTCDepositRange.fixed,
            false,
            wBTCContract,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = (await client.readContract({
        address: wBTCContract,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, bendContract],
    })) as bigint;

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = BendConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 8)} wBTC approve`);

        const { request } = await client
            .simulateContract({
                address: wBTCContract,
                abi: erc20ABI,
                functionName: 'approve',
                args: [bendContract, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve wBTC - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve wBTC - ${e}`);
                return false;
            });

            if (approveHash === false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + approveHash}`;

            printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

            await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
        }
    }

    printInfo(`Произвожу закидывание ${formatUnits(value!, 8)} wBTC`);

    const data = encodeFunctionData({
        abi: bendABI,
        functionName: 'supply',
        args: [wBTCContract, value!, account.address, BigInt(0)],
    });

    const preparedTransaction = await walletClient.prepareTransactionRequest({
        account,
        to: bendContract,
        data: data,
    });

    const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
        printError(`Произошла ошибка во время выполнения модуля borrow на BEND - ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля borrow на BEND - ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅BEND: supply ${formatUnits(value!, 8)} wBTC <a href='${url}'>link</a>`);

        return true;
    }

    return false;
}

export async function bendBorrow(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль delegate на STATION`);

    let publicClient!: PublicClient;
    publicClient = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const accountData = await publicClient.readContract({
        address: bendContract,
        abi: bendABI,
        functionName: 'getUserAccountData',
        args: [account.address],
    });

    let [, , availableBorrowsBase] = accountData as bigint[];

    const randomFixed = Math.floor(
        Math.random() * (BendConfig.HoneyBorrowPercentRange.fixed.max - BendConfig.HoneyBorrowPercentRange.fixed.min) +
            BendConfig.HoneyBorrowPercentRange.fixed.min,
    );

    const randomPercent =
        Math.random() * (BendConfig.HoneyBorrowPercentRange.range.max - BendConfig.HoneyBorrowPercentRange.range.min) +
        BendConfig.HoneyBorrowPercentRange.range.min;

    const honeyRimmed =
        randomPercent == 1 ? 0.01 : randomPercent + 0.01 == 1 ? 0.01 : Number((1 - randomPercent).toFixed(2));

    availableBorrowsBase = replaceDigitsWithZeros(
        calculateRimmedAmount(availableBorrowsBase, honeyRimmed),
        randomFixed,
    );

    let client!: PublicClient;
    client = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(`Произвожу занимание ${formatEther(parseUnits(availableBorrowsBase!.toString(), 10))} HONEY`);

    const { request } = await client
        .simulateContract({
            abi: bendABI,
            address: bendContract,
            functionName: 'borrow',
            args: [assetOut, Number(parseUnits(availableBorrowsBase!.toString(), 10)), BigInt(2), 0, account.address],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения borrow HONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения borrow HONEY - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(
            `✅BEND: borrow ${formatEther(parseUnits(availableBorrowsBase!.toString(), 10))} HONEY <a href='${url}'>link</a>`,
        );

        return true;
    }

    return false;
}
