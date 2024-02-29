import axios from 'axios';
import { HttpAgentObject, SocksAgentObject } from '../utils/utilsData';
import UserAgent from 'user-agents';
import { headers, RequestTypes } from './instanceData';
import { IHeader } from '../utils/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { generateAcceptLanguage, getHeaderData } from '../utils/utils';
import { saveData } from '../../database/database';
import { printInfo } from '../logger/logger';

let headerData: IHeader;

export const generateAxiosInstance = (type: RequestTypes, agent: HttpAgentObject | SocksAgentObject | null = null) => {
    let axiosConfig = {
        headers: {
            ...headers[type],
        },
    };

    if (agent) {
        axiosConfig = {
            ...axiosConfig,
            ...agent,
        };
    }

    return axios.create(axiosConfig);
};

export function updateHeaders(type: RequestTypes) {
    headers[type]['user-agent'] = headerData.userAgent.toString();
    headers[type]['accept-language'] = headerData.acceptLanguage;
    headers[type]['sec-ch-ua'] = headerData.secChUa.toString();
}

export function updateAuthorizationHeader(type: RequestTypes, token: string) {
    if (type == 'tap' || type == 'galxe') {
        headers[type]['authorization'] = token;
    }
}

export function updateRequestIdHeader(type: RequestTypes) {
    const uuid = uuidv4();

    if (type == 'galxe') {
        headers[type]['request-id'] = uuid;
    }
}

export function generateRandomHeadersData(address: string) {
    const data = getHeaderData(address);

    if (data) {
        headerData = {
            userAgent: data.userAgent,
            secChUa: data.secChUa,
            acceptLanguage: data.acceptLanguage,
        };

        printInfo(`Успешно выгрузил данные из базы`);
    } else {
        const userAgent = new UserAgent({ deviceCategory: 'desktop', platform: 'Win32' }).data.userAgent.toString();

        const chromeVersionMatch = userAgent.match(/Chrome\/(\d+)\./);
        const chromeVersion = chromeVersionMatch ? chromeVersionMatch[1] : null;

        const acceptLanguage = generateAcceptLanguage();
        const secChUa = `"Not A(Brand";v="99", "Google Chrome";v="${chromeVersion}", "Chromium";v="${chromeVersion}"`;

        if (chromeVersion) {
            headerData = {
                userAgent: userAgent,
                secChUa: secChUa,
                acceptLanguage: acceptLanguage,
            };

            saveData({ address: address, userAgent: userAgent, secChUa: secChUa, acceptLanguage: acceptLanguage });
            printInfo(`Успешно загрузил новые данные в базу`);
        }
    }
}
