import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { privateKeyToAccount } from 'viem/accounts';
import { printError, printInfo, printSuccess } from './middlewares/logger/logger';
import {
    addTextMessage,
    initializeTelegramBot,
    resetTextMessage,
    sendMessage,
    stopTelegramBot,
} from './middlewares/telegram/telegramBot';
import { delay } from './middlewares/delayer/delayer';
import { Config, GalxeConfig, TelegramData } from './config';
import { claimToken } from './middlewares/requests/requester/requester';
import { addPool, bexSwapToBTC, bexSwapToStgUSDC, claimBGT } from './core/bex/bex';
import { honeySwapToHONEY } from './core/honey/honey';
import { bendBorrow, bendSupply } from './core/bend/bend';
import { berpsFillVault } from './core/berps/berps';
import { delegateBGT } from './core/station/station';
import { queryGalxe } from './core/galxe/galxe';
import { generateRandomHeadersData, updateHeaders } from './middlewares/axiosInstance/axiosInstance';
import { loadState, saveData } from './database/database';
import { config } from 'dotenv';
import { addAddress, addPrivateKey, createExcelTable, updateStatus } from './middlewares/excel/excelWorker';

config({ path: '../.env' });

let account;

const privateKeysFilePath = path.join(__dirname, 'assets', 'private_keys.txt');
const proxiesFilePath = path.join(__dirname, 'assets', 'proxies.txt');

const privateKeysPath = fs.createReadStream(privateKeysFilePath);
const proxiesPath = fs.createReadStream(proxiesFilePath);

const privateKeysLines = getFileLines(privateKeysFilePath);
const proxiesLines = getFileLines(proxiesFilePath);

const actions = [];

async function start() {
    let modulesCount = 0,
        index = 0;

    process.on('SIGINT', () => {
        saveData({ accountIndex: index, remainingModules: modulesCount });
        printInfo(
            `Записал состояние в базу данных, номер аккаунта - ${index + 1}, кол-во оставшихся модулей - ${modulesCount}`,
        );
        process.exit();
    });

    await createExcelTable();

    const rlPrivateKeys = readline.createInterface({
        input: privateKeysPath,
        crlfDelay: Infinity,
    });

    let rlProxies: readline.Interface | undefined;
    let proxiesIterator: AsyncIterableIterator<string> | undefined;

    if (Config.IsClaimTap && Config.IsStaticProxy) {
        if (privateKeysLines.length !== proxiesLines.length) {
            printError(
                `Длинны файлов прокси - ${proxiesLines.length} и приватников - ${privateKeysLines.length} не совпадают `,
            );
            return;
        }

        rlProxies = readline.createInterface({
            input: proxiesPath,
            crlfDelay: Infinity,
        });

        proxiesIterator = rlProxies[Symbol.asyncIterator]() as AsyncIterableIterator<string>;
    }

    const data = fs.readFileSync(privateKeysFilePath, 'utf8');
    const count = data.split('\n').length;

    await initializeTelegramBot(TelegramData.TelegramBotId, TelegramData.TelegramId);

    let isLoadState = Config.IsLoadState;

    for await (const line of rlPrivateKeys) {
        try {
            if (line == '') {
                printError(`Ошибка, пустая строка в файле private_keys.txt, строка - ${index + 1}`);
                return;
            }

            if (Config.IsShuffleWallets) {
                printInfo(`Произвожу перемешивание кошельков.`);
                await shuffleData();
                printSuccess(`Кошельки успешно перемешаны.\n`);
            }

            const state = loadState();

            if (isLoadState && state.accountIndex != 0) {
                if (index >= state.accountIndex - 1) {
                    isLoadState = false;
                    printInfo(`Загружаю аккаунт, с которого продолжить работу из базы данных.\n`);
                    index++;
                } else {
                    index++;
                }
            } else {
                const proxy = Config.IsStaticProxy && Config.IsClaimTap ? (await proxiesIterator!.next()).value : '';

                account = privateKeyToAccount(<`0x${string}`>line);
                printInfo(`Start [${index + 1}/${count} - ${account.address}]\n`);

                await addAddress(account.address);
                await addPrivateKey(<`0x${string}`>line);

                await addTextMessage(`${index + 1}/${count} - ${account.address}\n`);

                generateRandomHeadersData(account.address);

                if (GalxeConfig.IsOnlyDaily) {
                    await queryGalxe(account, null);
                } else {
                    updateHeaders('route');

                    //await claimToken(account.address, proxy);

                    //await delay(60, 80, false);
                    //await berpsFillVault(account);
                    //await claimBGT(account);
                    //await delegateBGT(account);

                    // await addPool(account);
                    await bexSwapToBTC(account);
                    //await bexSwapToStgUSDC(account);
                    //await addPool(account);

                    //await honeySwapToHONEY(account);
                    //await bendSupply(account);
                    //await bendBorrow(account);

                    modulesCount = Math.floor(
                        Math.random() * (Config.ModulesCount.max - Config.ModulesCount.min) + Config.ModulesCount.min,
                    );

                    const state = loadState();

                    if (Config.IsLoadState && state.remainingModules != 0) {
                        const remainingModules = state.remainingModules;

                        printInfo(`Загружаю количество оставшихся модулей на аккаунте из базы данных.`);

                        modulesCount = remainingModules;
                    }

                    printInfo(`Буду выполнять ${modulesCount} модулей на аккаунте\n`);

                    // for (let i = modulesCount; i > 0; ) {
                    //     const randomFunction = actions[Math.floor(Math.random() * actions.length)];
                    //
                    //     const result = await randomFunction(account);
                    //     i--;
                    //
                    //     if (i != 0) {
                    //         printInfo(`Осталось выполнить ${i} модулей на аккаунте\n`);
                    //
                    //         if (result == true) {
                    //             await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, true);
                    //         } else {
                    //             await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, false);
                    //         }
                    //     }
                    // }

                    await queryGalxe(account, null);
                }

                printSuccess(`Ended [${index + 1}/${count} - ${account.address}]\n`);

                await sendMessage();
                await resetTextMessage();

                await updateStatus(`success`);

                fs.appendFile('assets/completed_accounts', `${line}\n`, 'utf8', (err) => {
                    if (err) {
                        printError(`Произошла ошибка при записи в файл: ${err}`);
                    }
                });

                index++;

                if (index == count) {
                    printSuccess(`Все аккаунты отработаны`);
                    rlPrivateKeys.close();
                    await stopTelegramBot();
                    return;
                }

                printInfo(`Ожидаю получение нового аккаунта`);
                await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, false);
            }
        } catch (e) {
            printError(`Произошла ошибка при обработке строки: ${e}\n`);

            await updateStatus(`error`);

            await addTextMessage(`❌Аккаунт отработал с ошибкой`);
            await sendMessage();
            await resetTextMessage();

            printInfo(`Ожидаю получение нового аккаунта`);
            await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, false);

            fs.appendFile('assets/uncompleted_accounts', `${line}\n`, 'utf8', (err) => {
                if (err) {
                    printError(`Произошла ошибка при записи в файл: ${err}`);
                }
            });

            index++;
        }
    }
}

function getFileLines(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n');
}

async function shuffleData() {
    try {
        const data1 = fs.readFileSync(privateKeysFilePath, 'utf8');
        const data2 = fs.readFileSync(proxiesFilePath, 'utf8');

        const lines1 = data1.split('\n');
        const lines2 = data2.split('\n');

        for (let i = lines1.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines1[i], lines1[j]] = [lines1[j], lines1[i]];
            [lines2[i], lines2[j]] = [lines2[j], lines2[i]];
        }

        await fs.writeFileSync(privateKeysFilePath, lines1.join('\n'), 'utf8');
        await fs.writeFileSync(proxiesFilePath, lines2.join('\n'), 'utf8');
    } catch (error) {
        printError(`Произошла ошибка во время перемешивания данных: ${error}`);
    }
}

start();
