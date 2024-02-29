import { Hex } from 'viem';
import axios from 'axios';
import { printError, printInfo, printSuccess } from '../../logger/logger';
import { Config } from '../../../config';
import { addTextMessage } from '../../telegram/telegramBot';
import { delay } from '../../delayer/delayer';
import { IRouteStep } from '../../utils/interfaces';
import { balanceJsonData, captchaEndpoints, requestEndpoints, taskJsonData } from './requesterData';
import { convertProxy } from '../../utils/utils';
import { generateAxiosInstance, updateAuthorizationHeader, updateHeaders } from '../../axiosInstance/axiosInstance';
import { HttpsProxyAgent } from 'https-proxy-agent';
import process from 'process';

export async function claimToken(address: string, proxy: string = '') {
    let agent;

    if (Config.IsClaimTap) {
        try {
            printInfo(`Выполняю модуль получения тестовых токенов\n`);

            if (Config.IsMobileProxy) {
                printInfo(`Использую мобильные прокси - ${agent}`);
                agent = await changeProxy();
            } else {
                agent = convertProxy(proxy);
                printInfo(`Использую статичные прокси - ${proxy}`);
            }
        } catch (err) {
            printError(`Произошла ошибка во время использование прокси - ${err}, proxy - ${proxy}`);
            return false;
        }
    } else {
        return false;
    }

    let solveResponse = await getCaptchaSolve();
    let currentTry = 0;

    updateHeaders('tap');

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        const token = solveResponse!.data.solution.token;
        updateAuthorizationHeader('tap', `Bearer ${token!}`);

        if (currentTry == Config.RetryCount) {
            printError(
                `Не удалось получить тестовые токены. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        const body = { address: address };

        const axiosInstance = generateAxiosInstance('tap', agent);

        const getTokenResponse = await axiosInstance
            .post(`${requestEndpoints.getToken}${address}`, body)
            .then(async (res) => {
                printSuccess(`Токены успешно получены, message - ${res.data.message}`);
                await addTextMessage(`✅RuСaptcha: Solve captcha successfully`);
                await addTextMessage(`✅Faucet: Token successfully claimed `);

                return true;
            })
            .catch((err) => {
                let data;
                try {
                    data = JSON.parse(err.response.data);
                } catch (e) {
                    data = err.response.data;
                }

                if (typeof data === 'object' && 'msg' in data) {
                    printError(`Произошла ошибка во время получения токенов: ${data.msg}\n`);
                    return data.msg;
                } else {
                    printError(`Произошла ошибка во время получения токенов: ${data}`);
                    return data;
                }
            });

        if (getTokenResponse === true) {
            return true;
        }

        if (getTokenResponse.includes('You have exceeded the rate limit.')) {
            printError(`Токены уже получены на аккаунт - ${address}, proxy - ${proxy}`);
            return false;
        }

        currentTry++;
        solveResponse = await getCaptchaSolve();
    }

    printError(`Произошла ошибка во время решения капчи`);
    return false;
}

async function changeProxy() {
    return { httpsProxy: new HttpsProxyAgent('sffsfs') };
}

async function getCaptchaSolve() {
    await axios
        .post(captchaEndpoints.getBalance, balanceJsonData)
        .then((res) => {
            printInfo(`Текущий баланс 2captcha: ${res.data.balance}`);
        })
        .catch((err) => {
            printError(`Произошла ошибка во время получения баланса: ${err}`);
        });

    const taskIdResponse = await axios.post(captchaEndpoints.createTask, taskJsonData);

    const getTaskResultJsonData = {
        clientKey: process.env.RUCAPTCHA_API_KEY,
        taskId: taskIdResponse.data.taskId,
    };

    printInfo(`Жду получения решения капчи`);
    await delay(25, 25, false);

    let solveResponse = await axios.post(captchaEndpoints.getTaskResult, getTaskResultJsonData);

    while (solveResponse.data.status == 'processing') {
        printInfo(`Капча еще не решена`);
        await delay(15, 15, false);
        solveResponse = await axios.post(captchaEndpoints.getTaskResult, getTaskResultJsonData);
    }

    if (solveResponse.data.status == 'ready') {
        printSuccess(`Капча успешно решена`);

        return solveResponse;
    }

    return;
}

export async function getRoute(amount: bigint, quote: Hex, base: Hex): Promise<IRouteStep[]> {
    const routeRequest = await axios
        .get(`${requestEndpoints.getRoute}${quote}&baseAsset=${base}&amount=${amount}&swap_type=given_in`)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время получения route - ${err}`);
            return null;
        });

    if (routeRequest !== null && 'data' in routeRequest) {
        return routeRequest!.data.steps;
    }

    return [];
}
