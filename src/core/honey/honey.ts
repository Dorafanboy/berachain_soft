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
import { approveInfinity, honeyContract, stargateUSDContract, swapPath } from '../bex/bexData';
import { berachain, Config, HoneyConfig } from '../../config';
import { getValue } from '../../middlewares/utils/utils';
import { delay } from '../../middlewares/delayer/delayer';
import { erc20ABI } from '../../abis/erc20';
import { honeyABI } from '../../abis/honey';
import { addTextMessage } from '../../middlewares/telegram/telegramBot';

export async function honeySwapToHONEY(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль swap на HONEY ${swapPath[2]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на HONEY. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[2]}`);

        value = await getValue(
            client,
            account.address,
            HoneyConfig.SellSTGHONEYRange.range,
            HoneyConfig.SellSTGHONEYRange.fixed,
            true,
            stargateUSDContract,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = (await client.readContract({
        address: stargateUSDContract,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, honeyContract],
    })) as bigint;

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = HoneyConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 18)} stgUSDC approve`);

        const { request } = await client
            .simulateContract({
                address: stargateUSDContract,
                abi: erc20ABI,
                functionName: 'approve',
                args: [honeyContract, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve stgUSDC - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve stgUSDC - ${e}`);
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

    printInfo(`Произвожу покупку HONEY на ${formatUnits(value!, 18)} stgUSDC `);

    const { request } = await client
        .simulateContract({
            address: honeyContract,
            abi: honeyABI,
            functionName: 'mint',
            args: [account.address, stargateUSDContract, value!],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля swap на HONEY ${swapPath[2]} - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля swap на HONEY ${swapPath[2]} - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅HONEY: swap ${formatUnits(value!, 18)} stgUSDC на HONEY <a href='${url}'>link</a>`);

        return true;
    }

    return false;
}
