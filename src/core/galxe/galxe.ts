import { PrivateKeyAccount } from 'viem';
import {
    answerQuiz,
    dripBERA,
    getTotalPoints,
    mintHONEY,
    getAuthToken,
    queryClaimDaily,
    swapBERA,
    visitBerachainDocs,
    visitProofOfLiquidityPage,
    claimPoints,
} from '../../middlewares/requests/galxeRequester/galxeRequester';
import { delay } from '../../middlewares/delayer/delayer';
import { GalxeConfig } from '../../config';
import {
    generateAxiosInstance,
    updateAuthorizationHeader,
    updateHeaders,
    updateRequestIdHeader,
} from '../../middlewares/axiosInstance/axiosInstance';
import { HttpAgentObject, SocksAgentObject } from '../../middlewares/utils/utilsData';
import * as console from 'console';

export async function queryGalxe(account: PrivateKeyAccount, agent: HttpAgentObject | SocksAgentObject | null) {
    updateHeaders('galxe');

    const token = await getAuthToken(account);

    updateAuthorizationHeader('galxe', token);
    updateRequestIdHeader('galxe');

    console.log(agent);
    const axiosInstance = generateAxiosInstance('galxe', agent);

    console.log(axiosInstance);

    if (GalxeConfig.IsOnlyDaily) {
        await queryClaimDaily(account, axiosInstance);
        updateRequestIdHeader('galxe');

        await claimPoints(account, axiosInstance, true);
        updateRequestIdHeader('galxe');

        await delay(5, 10, false);

        await getTotalPoints(account, axiosInstance);
        updateRequestIdHeader('galxe');

        return true;
    }

    await queryClaimDaily(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await visitProofOfLiquidityPage(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await visitBerachainDocs(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await answerQuiz(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await dripBERA(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await swapBERA(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await mintHONEY(account, axiosInstance);
    updateRequestIdHeader('galxe');

    await claimPoints(account, axiosInstance, true);
    updateRequestIdHeader('galxe');

    await claimPoints(account, axiosInstance, false);
    updateRequestIdHeader('galxe');

    await getTotalPoints(account, axiosInstance);
    updateRequestIdHeader('galxe');

    return true;
}
