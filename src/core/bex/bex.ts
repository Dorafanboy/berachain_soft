import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    formatUnits,
    getAddress,
    http,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
    zeroAddress,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../middlewares/logger/logger';
import { getRoute } from '../../middlewares/requests/requester/requester';
import { berachain, BexConfig, Config } from '../../config';
import { calculateRimmedAmount, getValue, replaceDigitsWithZeros } from '../../middlewares/utils/utils';
import { delay } from '../../middlewares/delayer/delayer';
import {
    approveInfinity,
    bexClaimRewardContract,
    bexContract,
    deadline,
    stargateUSDContract,
    stargateUSDCwBERAPoolId,
    swapPath,
    userData,
    wBERAContract,
    wBTCContract,
} from './bexData';
import { addTextMessage } from '../../middlewares/telegram/telegramBot';
import { bexABI } from '../../abis/bex';
import { erc20ABI } from '../../abis/erc20';
import { rewardsABI } from '../../abis/rewards';
import { IReward } from '../../middlewares/utils/interfaces';

export async function bexSwapToStgUSDC(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль swap на BEX ${swapPath[0]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[0]}`);

        value = await getValue(
            client,
            account.address,
            BexConfig.SellBeraSTGRange.range,
            BexConfig.SellBeraSTGRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const route = await getRoute(value!, stargateUSDContract, wBERAContract);

    const routeAmountOut = route.length == 1 ? Number(route[0].amountOut) : Number(route[1].amountOut);

    const amountOut: bigint = BigInt(Math.floor(routeAmountOut - routeAmountOut * 0.015));

    printInfo(
        `Произвожу покупку ${formatUnits(amountOut, 18)} stgUSDC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} `,
    );

    const data = encodeFunctionData({
        abi: bexABI,
        functionName: 'batchSwap',
        args: [
            0,
            [
                {
                    poolId: stargateUSDCwBERAPoolId,
                    assetIn: zeroAddress,
                    amountIn: value!,
                    assetOut: stargateUSDContract,
                    amountOut: amountOut,
                    userData: userData,
                },
            ],
            deadline,
        ],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const preparedTransaction = await walletClient.prepareTransactionRequest({
        account,
        to: bexContract,
        data: data,
        value: value,
    });

    const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
        printError(`Произошла ошибка во время выполнения модуля ${swapPath[0]} swap на BEX - ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${swapPath[0]} swap на BEX - ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(
            `✅BEX: swap ${formatUnits(amountOut, 18)} stgUSDC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} <a href='${url}'>link</a>`,
        );

        return true;
    }

    return false;
}

export async function bexSwapToBTC(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль swap на BEX ${swapPath[1]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[1]}`);

        value = await getValue(
            client,
            account.address,
            BexConfig.SellBeraBTCRange.range,
            BexConfig.SellBeraBTCRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const route = await getRoute(value!, wBTCContract, wBERAContract);

    const amountOutRimmed: bigint =
        route.length == 1 ? calculateRimmedAmount(route[0].amountOut) : calculateRimmedAmount(route[1].amountOut);

    const batchSwapArgs =
        route.length == 1
            ? [
                  0,
                  [
                      {
                          poolId: getAddress(route[0].pool),
                          assetIn: zeroAddress,
                          amountIn: value!,
                          assetOut: getAddress(route[0].assetOut),
                          amountOut: amountOutRimmed,
                          userData: userData,
                      },
                  ],
                  deadline,
              ]
            : [
                  0,
                  [
                      {
                          poolId: getAddress(route[0].pool),
                          assetIn: zeroAddress,
                          amountIn: value!,
                          assetOut: getAddress(route[0].assetOut),
                          amountOut: BigInt(0),
                          userData: userData,
                      },
                      {
                          poolId: getAddress(route[1].pool),
                          assetIn: getAddress(route[1].assetIn),
                          amountIn: route[0].amountOut,
                          assetOut: getAddress(route[1].assetOut),
                          amountOut: amountOutRimmed,
                          userData: userData,
                      },
                  ],
                  deadline,
              ];

    printInfo(
        `Произвожу покупку ${formatUnits(amountOutRimmed, 8)} BTC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} `,
    );

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const data = encodeFunctionData({
        abi: bexABI,
        functionName: 'batchSwap',
        args: batchSwapArgs,
    });

    const preparedTransaction = await walletClient.prepareTransactionRequest({
        account,
        to: bexContract,
        data: data,
        value: value,
    });

    const signature = await walletClient.signTransaction(preparedTransaction!).catch((e) => {
        printError(`Произошла ошибка во время выполнения sign модуля ${swapPath[1]} swap на BEX - ${e}`);
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля ${swapPath[1]} swap на BEX - ${e}`);
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(
            `✅BEX: swap ${formatUnits(amountOutRimmed, 8)} BTC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} <a href='${url}'>link</a>`,
        );

        return true;
    }

    return false;
}

export async function addPool(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль add pool на BEX`);

    let currentTry: number = 0,
        firstToken,
        secondToken;

    let client!: PublicClient;

    let randomPool;
    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для добавления в пул на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        const randomIndex = Math.floor(Math.random() * BexConfig.Pools.length);
        randomPool = BexConfig.Pools[randomIndex];

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь найти баланс ${randomPool.firstTokenName} + ${randomPool.secondTokenName}`);

        firstToken = await getValue(
            client,
            account.address,
            randomPool.firstTokenAmount.range,
            randomPool.firstTokenAmount.fixed,
            true,
            randomPool!.firstTokenAddress,
        );

        secondToken = await getValue(
            client,
            account.address,
            randomPool.secondTokenAmount.range,
            randomPool.secondTokenAmount.fixed,
            true,
            randomPool!.secondTokenAddress,
        );

        currentTry++;

        if (firstToken != null && firstToken != BigInt(-1) && secondToken != null && secondToken != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = (await client.readContract({
        address: randomPool!.firstTokenAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, randomPool!.toApprove],
    })) as bigint;

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(firstToken!)) {
        const isInfinity = BexConfig.IsApproveInfinity;

        printInfo(
            `Произвожу ${isInfinity ? 'infinity' : formatUnits(firstToken!, 18)} ${randomPool!.firstTokenName} approve`,
        );

        const { request } = await client
            .simulateContract({
                address: randomPool!.firstTokenAddress,
                abi: erc20ABI,
                functionName: 'approve',
                args: [randomPool!.toApprove, isInfinity ? approveInfinity : firstToken!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(
                    `Произошла ошибка во время выполнения approve add pool ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} - ${e}`,
                );
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(
                    `Произошла ошибка во время выполнения модуля add pool ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} - ${e}`,
                );
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

    printInfo(
        `Произвожу добавление в пул ${formatUnits(firstToken!, 18)} ${randomPool!.firstTokenName} + ${formatUnits(secondToken!, 18)} ${randomPool!.secondTokenName} `,
    );

    const data = encodeFunctionData({
        abi: bexABI,
        functionName: 'addLiquidity',
        args: [
            randomPool!.poolAddress,
            account.address,
            [randomPool!.firstTokenAddress, randomPool!.secondTokenAddress],
            [firstToken!, secondToken!],
        ],
    });

    const preparedTransaction = await walletClient!.prepareTransactionRequest({
        account,
        to: bexContract,
        data: data,
        value: secondToken,
    });

    const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
        printError(
            `Произошла ошибка во время выполнения модуля add liquidity ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} на BEX - ${e}`,
        );
        return undefined;
    });

    if (signature !== undefined) {
        const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
            printError(
                `Произошла ошибка во время выполнения add liquidity ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} на BEX - ${e}`,
            );
            return false;
        });

        if (hash == false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(
            `✅BEX: add liquidity ${formatUnits(firstToken!, 18)} ${randomPool!.firstTokenName} + ${formatUnits(secondToken!, 18)} ${randomPool!.secondTokenName} <a href='${url}'>link</a>`,
        );

        return true;
    }

    return false;
}

export async function claimBGT(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль claim BGT reward на BEX`);

    let publicClient!: PublicClient;
    publicClient = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    let currentRewards, amount, foundPool;
    for (const pool of BexConfig.Pools) {
        currentRewards = (await publicClient.readContract({
            address: bexClaimRewardContract,
            abi: rewardsABI,
            functionName: 'getCurrentRewards',
            args: [account.address, pool.poolAddress],
        })) as IReward[];

        if (currentRewards.length == 0) {
            amount = BigInt(0);
        } else {
            amount = currentRewards[0].amount;
        }

        if (amount > BigInt(0)) {
            foundPool = pool;
            break;
        }
    }

    if (amount == BigInt(0)) {
        printInfo(`Не было найдено пула для забирания наград`);
        return false;
    }

    const fullBalanceReward = amount;
    const isFullBalance =
        BexConfig.ClaimBGTRewardPercent.range.max == 1 && BexConfig.ClaimBGTRewardPercent.range.min == 1;

    const randomFixed = Math.floor(
        Math.random() * (BexConfig.ClaimBGTRewardPercent.fixed.max - BexConfig.ClaimBGTRewardPercent.fixed.min) +
            BexConfig.ClaimBGTRewardPercent.fixed.min,
    );

    const randomPercent =
        Math.random() * (BexConfig.ClaimBGTRewardPercent.range.max - BexConfig.ClaimBGTRewardPercent.range.min) +
        BexConfig.ClaimBGTRewardPercent.range.min;

    const honeyRimmed =
        randomPercent == 1 ? 0.01 : randomPercent + 0.01 == 1 ? 0.01 : Number((1 - randomPercent).toFixed(2));

    amount = replaceDigitsWithZeros(calculateRimmedAmount(amount!, honeyRimmed), randomFixed);

    printInfo(
        `Произвожу забирание ${isFullBalance ? formatUnits(fullBalanceReward!, 18) : formatUnits(amount, 18)} BGT из пула ${foundPool!.firstTokenName} + ${foundPool!.secondTokenName}`,
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

    const args = isFullBalance ? [foundPool!.poolAddress] : [foundPool!.poolAddress, amount];

    const functionName = isFullBalance ? 'withdrawAllDepositorRewards' : 'withdrawDepositorRewards';

    const { request } = await client
        .simulateContract({
            abi: rewardsABI,
            address: bexClaimRewardContract,
            functionName: functionName,
            args: args,
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT reward на BEX - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT reward на BEX - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(
            `✅BEX: claim ${isFullBalance ? formatUnits(fullBalanceReward!, 18) : formatUnits(amount, 18)} BGT из пула ${foundPool!.firstTokenName} + ${foundPool!.secondTokenName} <a href='${url}'>link</a>`,
        );

        return true;
    }

    return false;
}
