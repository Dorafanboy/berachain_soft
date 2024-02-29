import { Config } from '../../../config';
import * as process from 'process';

export const sitekey = '6LfOA04pAAAAAL9ttkwIz40hC63_7IsaU2MgcwVH';
export const action = 'submit';
export const pageurl = 'https://artio.faucet.berachain.com/';

export const captchaEndpoints = {
    getBalance: 'https://api.2captcha.com/getBalance',
    createTask: `https://api.2captcha.com/createTask`,
    getTaskResult: `https://api.2captcha.com/getTaskResult`,
};

export const balanceJsonData = {
    clientKey: process.env.RUCAPTCHA_API_KEY,
};

export const requestEndpoints = {
    getToken: `https://artio-80085-faucet-api-recaptcha.berachain.com/api/claim?address=`,
    getRoute: `https://artio-80085-dex-router.berachain.com/dex/route?quoteAsset=`,
};

export const taskJsonData = {
    clientKey: process.env.RUCAPTCHA_API_KEY,
    task: {
        type: 'RecaptchaV3TaskProxyless',
        websiteURL: pageurl,
        websiteKey: sitekey,
        minScore: Config.Score,
        pageAction: action,
    },
};
