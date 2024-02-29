import {
    createPublicClient,
    createWalletClient,
    formatUnits,
    http,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../middlewares/logger/logger';
import { approveInfinity, assetOut } from '../bex/bexData';
import { berachain, BerpsConfig, Config } from '../../config';
import { getValue } from '../../middlewares/utils/utils';
import { delay } from '../../middlewares/delayer/delayer';
import { addTextMessage } from '../../middlewares/telegram/telegramBot';
import { erc20ABI } from '../../abis/erc20';
import { berpsContract } from './berpsData';
import { berpsABI } from '../../abis/berps';

export async function berpsFillVault(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль добавления в vault на BERPS`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для добавления в vault на BERPS. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести добавление в vault`);

        value = await getValue(
            client,
            account.address,
            BerpsConfig.HoneyDepositRange.range,
            BerpsConfig.HoneyDepositRange.fixed,
            true,
            assetOut,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = (await client.readContract({
        address: assetOut,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, berpsContract],
    })) as bigint;

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = BerpsConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 18)} HONEY approve`);

        const { request } = await client
            .simulateContract({
                address: assetOut,
                abi: erc20ABI,
                functionName: 'approve',
                args: [berpsContract, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve HONEY - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve HONEY - ${e}`);
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

    printInfo(`Произвожу добавление в vault ${formatUnits(value!, 18)} HONEY`);

    const { request } = await client
        .simulateContract({
            abi: berpsABI,
            address: berpsContract,
            functionName: 'deposit',
            args: [value, account.address],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit HONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit HONEY - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅BERPS: deposit ${formatUnits(value!, 18)} HONEY <a href='${url}'>link</a>`);

        return true;
    }

    return false;
}
