﻿import { IBridgeRange, ICaptcha, IFixedRange, IHeaderAddress, IUser } from './interfaces';
import { formatUnits, Hex, parseEther, parseUnits, PublicClient, zeroAddress } from 'viem';
import { Config, GalxeConfig } from '../../config';
import { delay } from '../delayer/delayer';
import { printError, printInfo } from '../logger/logger';
import { erc20ABI } from '../../abis/erc20';
import * as console from 'console';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { HttpAgentObject, SocksAgentObject } from './utilsData';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import { headersFilePath, stateFilePath } from '../../database/databaseData';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Mailjs from '@cemalgnlts/mailjs';

export async function getValue(
    client: PublicClient,
    address: Hex,
    bridgeRange: IBridgeRange,
    fixedRange: IFixedRange,
    isBridge: boolean,
    tokenAddress: Hex = zeroAddress,
): Promise<bigint> {
    const balance =
        tokenAddress == zeroAddress
            ? await getBridgeBalance(client, address)
            : await getSwapBalance(client, address, tokenAddress);

    let value = 0,
        fixed,
        currentTry = 0;
    let weiValue: bigint = parseEther('0');
    const decimals = isBridge ? 18 : 8;

    if (balance == parseEther('0')) {
        return BigInt(-1);
    }

    while (weiValue > balance || weiValue == parseEther('0')) {
        if (currentTry < Config.RetryCount) {
            value = Math.random() * (bridgeRange.max - bridgeRange.min) + bridgeRange.min;
            fixed = Math.floor(Math.random() * (fixedRange.max - fixedRange.min) + fixedRange.min);

            weiValue = parseEther(value.toFixed(fixed));
            const compareValue = isBridge ? weiValue : parseUnits(value.toFixed(fixed), 8);

            if (compareValue > balance) {
                printInfo(
                    `Полученное значение для ${isBridge ? 'бриджа' : 'свапа'} ${value.toFixed(
                        fixed,
                    )} больше чем баланс ${Number(formatUnits(balance, decimals)).toFixed(fixed)}`,
                );
                currentTry++;
                await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
            } else {
                return isBridge ? weiValue : parseUnits(value.toFixed(fixed), 8);
            }
        } else {
            printInfo(
                `Не было найдено необходимого кол-во средств для ${isBridge ? 'бриджа' : 'свапа'} в сети ${
                    client.chain?.name
                }\n`,
            );

            return BigInt(-1);
        }
    }

    return isBridge ? weiValue : parseUnits(value.toFixed(fixed), 8);
}

export async function getBridgeBalance(client: PublicClient, address: Hex) {
    const balance = await client.getBalance({
        address: address,
    });

    await checkZeroBalance(client, balance);

    return balance;
}

export async function getSwapBalance(client: PublicClient, address: Hex, tokenAddress: Hex) {
    const balance = (await client.readContract({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
    })) as bigint;

    await checkZeroBalance(client, parseUnits(balance.toString(), 0));

    return balance;
}

async function checkZeroBalance(client: PublicClient, balance: bigint) {
    if (balance == parseEther('0')) {
        printInfo(`Баланс аккаунта в сети ${client.chain?.name} равен нулю\n`);

        return parseEther('0');
    }
}

export function calculateRimmedAmount(amount: bigint, percent: number = 0.015): bigint {
    return BigInt(Math.floor(Number(amount) - Number(amount) * Number(percent)));
}

export function convertEtherView(num: bigint): string {
    const [whole, fraction] = num.toString().split('.');

    const fractionLength = fraction ? fraction.length : 0;
    const zerosToAdd = 18 - fractionLength;
    const newNum = whole + (fraction || '') + '0'.repeat(zerosToAdd);

    return newNum;
}

export function replaceDigitsWithZeros(num: bigint, digits: number): bigint {
    const str = num.toString();
    const zeros = '0'.repeat(digits);
    const result = str.slice(0, -digits) + zeros;

    return BigInt(result);
}

export function convertProxy(proxy: string): HttpAgentObject | SocksAgentObject {
    return proxy.includes('socks')
        ? { httpProxy: new SocksProxyAgent(proxy) }
        : proxy.includes('https')
          ? { httpsProxy: new HttpsProxyAgent(proxy) }
          : { httpsProxy: new HttpsProxyAgent(proxy) };
}

export function getMessage(address: string): string {
    const nonce = generateRandomNonce(17);

    const issuedAt = new Date();
    const expiredIn = new Date(issuedAt);
    expiredIn.setDate(issuedAt.getDate() + 7);

    return `galxe.com wants you to sign in with your Ethereum account:\n${address}\n\nSign in with Ethereum to the app.\n\nURI: https://galxe.com\nVersion: 1\nChain ID: 80085\nNonce: ${nonce}\nIssued At: ${issuedAt.toISOString()}\nExpiration Time: ${expiredIn.toISOString()}`;
}

export async function getCaptchaData(): Promise<ICaptcha> {
    const captcahId = `244bcb8b9846215df5af4c624a750db4`;
    const challenge = uuidv4();
    let timestamp = Date.now();

    const url = `https://gcaptcha4.geetest.com/load?captcha_id=${captcahId}&challenge=${challenge}&client_type=web&lang=ru-ru&callback=geetest_${timestamp}`;

    const gcaptcha = await axios
        .get(url)
        .then(async (res) => {
            const jsonMatch = res.data.match(/({.*})/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            } else {
                printError(`Не удалось найти JSON в ответе`);
                return null;
            }
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения load captcha - ${err}`);
            return null;
        });

    const lotNumber = gcaptcha.data.lot_number;
    const payLoad = gcaptcha.data.payload;
    const processToken = gcaptcha.data.process_token;
    const payloadProtocol = gcaptcha.data.payload_protocol;

    timestamp = Date.now();

    const params = {
        callback: `geetest_${timestamp}`,
        captcha_id: captcahId,
        client_type: 'web',
        lot_number: lotNumber,
        payload: payLoad,
        process_token: processToken,
        payload_protocol: payloadProtocol,
        pt: '1',
        w: GalxeConfig.W,
    };

    const url2 = `https://gcaptcha4.geetest.com/verify`;

    const verifyGcaptcha = await axios
        .get(url2, { params })
        .then(async (res) => {
            const jsonMatch = res.data.match(/({.*})/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            } else {
                printError(`Не удалось найти JSON в ответе`);
                return null;
            }
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения verify captcha - ${err}`);
            console.log(err);
            return null;
        });

    return {
        lotNumber: verifyGcaptcha!.data.lot_number,
        captchaOutput: verifyGcaptcha!.data.seccode.captcha_output,
        passToken: verifyGcaptcha!.data.seccode.pass_token,
        genTime: verifyGcaptcha!.data.seccode.gen_time,
    };
}

export async function confirmMail(user: IUser, attempts = 3): Promise<string> {
    if (attempts <= 0) {
        throw new Error('Превышено максимальное количество попыток подтверждения почты');
    }

    const mailjs = new Mailjs();

    await delay(10, 20, false);
    await mailjs.login(user.email, user.password);
    const messages = await mailjs.getMessages();

    if (messages && messages.data && messages.data[0] && messages.data[0].intro) {
        const code = messages.data[0].intro.match(/\d+/g);
        printInfo(`Успешно получил письмо с кодом - ${code![0].toString()}`);
        return code![0].toString();
    } else {
        printError(`Письмо не было найдено, пробую еще раз найти...`);
        await confirmMail(user, attempts - 1);
    }

    throw 'Не было найдено письмо galxe';
}

export async function registerMail(): Promise<IUser> {
    const mailjs = new Mailjs();

    const res = await mailjs.createOneAccount();
    const username = res.data.username;
    const password = res.data.password;

    printInfo(`Произвожу регистрацию аккаунта Galxe на адрес - ${username}`);

    return { email: username, password: password };
}

export function generateAcceptLanguage() {
    const languages = [
        'en-US',
        'en',
        'fr-FR',
        'fr',
        'de-DE',
        'de',
        'es-ES',
        'es',
        'it-IT',
        'it',
        'ru-RU',
        'ru',
        'ja-JP',
        'ja',
        'zh-CN',
        'zh',
    ];

    let headerValue = '';

    const numLanguages = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numLanguages; i++) {
        const randomIndex = Math.floor(Math.random() * languages.length);
        const language = languages[randomIndex];
        const quality = (0.9 - i * 0.1).toFixed(1);

        headerValue += `${language};q=${quality},`;
        languages.splice(randomIndex, 1);
    }

    return headerValue.slice(0, -1);
}

export function generateRandomNickName() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const length = Math.floor(Math.random() * 8) + 5;
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}

export function getHeaderData(targetAddress: string): IHeaderAddress | null {
    if (fs.existsSync(stateFilePath)) {
        const data = fs.readFileSync(headersFilePath, 'utf8');
        if (data) {
            try {
                const jsonObject = JSON.parse(data);
                for (const obj of jsonObject) {
                    if (obj.address === targetAddress) {
                        return obj;
                    }
                }
            } catch (error) {
                printError(`Ошибка при разборе JSON: ${error}`);
            }
        }
    }

    return null;
}

function generateRandomNonce(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}
