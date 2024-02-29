import { IBridgeRange, IDelayRange, IFixedRange, IPoolObject } from './middlewares/utils/interfaces';
import { defineChain, zeroAddress } from 'viem';
import {
    assetOut,
    stargateUSDContract,
    stgUSDCHONEYPoolContract,
    stgUSDCwBERAPoolContract,
    wBERAHONEYPoolContract,
} from './core/bex/bexData';

export class TelegramData {
    public static readonly TelegramBotId: string = ''; // айди телеграм бота, которому будут отправляться логи
    public static readonly TelegramId: string = ''; // телеграм айди @my_id_bot у него можно получить id
}

export class Config {
    public static readonly IsShuffleWallets: boolean = true; // перемешивать ли строки в текстовом файле для приватных ключей
    public static readonly IsLoadState: boolean = false; // загружать ли текущее состояние работы из базы данных
    public static readonly ModulesCount: IBridgeRange = { min: 5, max: 7 }; // сколько будет модулей выполнено на аккаунте
    public static readonly IsClaimTap: boolean = true;
    public static readonly Score = 0.3; // score <= 0.3 = 99 rub, score > 0.3 160 rub
    public static readonly IsMobileProxy: boolean = false; // если использовать мобильные прокси
    public static readonly IsStaticProxy: boolean = true; // если использовать статичные прокси, если mobile = true, то static = false и наоборот, или оба false, если будет и там и там true, то проритет у мобильных
    public static readonly ChangeMobileProxyUrl: string = ''; // url для смены прокси

    // если стоит IsClaimTap и IsMobileProxy используются прокси, мобильные, если IsStaticProxy то статичные прокси юзаются только в запросах, но в основном можно сотавить чисто на получение в кране
    public static readonly RetryCount: number = 5; // сколько попыток будет сделано чтобы заного попробовать выполнить модуль
    public static readonly DelayBetweenAction: IDelayRange = { min: 1, max: 5 }; // задержка между действиями (в секундах) в случае ошибки
    public static readonly DelayBetweenAccounts: IDelayRange = { min: 5, max: 10 }; // задержка между аккаунтами (в минутах)
    public static readonly DelayBetweenModules: IDelayRange = { min: 0.5, max: 0.7 }; // задержка между модулями (в минутах)
}

export class GalxeConfig {
    public static readonly W: string = // w нужно чтобы испольовать galxe
        '348804cdf3510980e6232d759b850d8b76ecd2cc35567d5b53540d1259b2d5885047114f5655c37c41bca8cf6ad225d9523f2fc60710c9a26fde00209ed3cb70e994b7fdffc778a40ce76a5a16e55befc9f94398cf26342e13d1fb155bb46dff2890586cb0551009782273924e871eaa170cd8157bf028c28042b1b7ab8c88005342912ce483c3e9d5cca9ef60ffc5654f16ac06ed0df93de6b5f23f0da6d48da21a9375c8d7d269fadf18799605a6970adbcc1f616cac641e6954a325241565a067ed67b7b59369f5faf62b6c9556e2dfa3c0ec2bb6dfb4153ca210f52e13f336b5cd56df798b52a847ac75b438d6c95906f955278ada49ce54ae98489cfa267cbbee10eccf9d716d5237f4578e43815f144b67c1bbe6c0c1ad76617541baf46753b21e0dbf78f63ee89ae7d5749fa63a508276063b40f6e04cc3ab4bccf6e16499e0946f63a11f9b5225285dd1505bae90156da3a1523dd805027fb3405d584ada96b3a9897847e2f090ae5404f8cdb306cb9eeadc79b07c0704b9b6bbafec15f25e7e75d0c07c33e2696e65c125226e0a83957c1212fc2a2c217b27e9388e546573be60996d0582e1ce95b3541b9380fb5c099cd4fef4c19747f2c14ff3cafbcf53c019c11e2a252825d294ab6553a93e5248a9534b57badd138571804e7256713bd8924a368291bad489b842308fb218b1990489ba1f4679932e6fbfc4a7';
    public static readonly IsOnlyDaily: boolean = true; // если забирать только daily
}

export class BexConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(на число для добавления в пул/бесконечное)
    public static readonly SellBeraSTGRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.0001, max: 0.0002 },
        fixed: { min: 6, max: 10 }, // сколько токенов бера будет потрачено на покупку stgUSDC
    };
    public static readonly SellBeraBTCRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.01, max: 0.01 },
        fixed: { min: 2, max: 2 }, // сколько токенов бера будет потрачено на покупку BTC
    };
    public static readonly IsApproveInfinity: boolean = BexConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
    public static readonly Pools: IPoolObject[] = [
        // сколько будет в пул добавлено и в каком диапазаоне
        {
            firstTokenAmount: {
                range: { min: 0.01, max: 0.01 },
                fixed: { min: 2, max: 2 },
            },
            secondTokenAmount: {
                range: { min: 0.01, max: 0.01 },
                fixed: { min: 2, max: 2 },
            },
            poolAddress: wBERAHONEYPoolContract,
            toApprove: stgUSDCwBERAPoolContract,
            firstTokenName: 'wBERA',
            secondTokenName: 'HONEY',
            firstTokenAddress: assetOut,
            secondTokenAddress: zeroAddress,
        },
        {
            firstTokenAmount: {
                range: { min: 0.01, max: 0.01 },
                fixed: { min: 2, max: 2 },
            },
            secondTokenAmount: {
                range: { min: 0.01, max: 0.01 },
                fixed: { min: 2, max: 2 },
            },
            poolAddress: stgUSDCHONEYPoolContract,
            toApprove: stgUSDCwBERAPoolContract,
            firstTokenName: 'HONEY',
            secondTokenName: 'stgUSDC',
            firstTokenAddress: assetOut,
            secondTokenAddress: stargateUSDContract,
        },
    ];
    public static readonly ClaimBGTRewardPercent: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 1, max: 1 },
        fixed: { min: 3, max: 7 }, // сколько процентов будет забрано из доступных ревардов BGT, если 1 min and max то заберет все
    };
}

export class HoneyConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(на число для свапа/бесконечное)
    public static readonly SellSTGHONEYRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.0001, max: 0.0002 },
        fixed: { min: 6, max: 10 }, // сколько токенов stgUSDC будет потрачено на покупку HONEY токенов
    };
    public static readonly IsApproveInfinity: boolean = HoneyConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
}

export class BendConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(на число для депа BTC/бесконечное)
    public static readonly wBTCDepositRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.000001, max: 0.000005 },
        fixed: { min: 12, max: 18 }, // сколько токенов wBTC будет закинуто
    };
    public static readonly IsApproveInfinity: boolean = BendConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
    public static readonly HoneyBorrowPercentRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.99, max: 0.99 },
        fixed: { min: 3, max: 7 }, // больше 7 max поставить нельзя, например будет 192524 доступно, а станет если fixed выпадет 5, то будет 100000
    }; // сколько процентов будет занято токена HONEY от имеющегося
}

export class BerpsConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(для добавления в сейф, сколько добавлять/бесконечное)
    public static readonly HoneyDepositRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.1, max: 0.15 },
        fixed: { min: 2, max: 5 }, // сколько токенов stgUSDC будет потрачено на покупку HONEY токенов
    };
    public static readonly IsApproveInfinity: boolean = BerpsConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
}

export class StationConfig {}

export const berachain = defineChain({
    id: 80085,
    name: 'Berachain Artio',
    nativeCurrency: {
        decimals: 18,
        name: 'BERA',
        symbol: 'BERA',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.ankr.com/berachain_testnet'], // поставить сюда https://artio.rpc.berachain.com
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://artio.beratrail.io' },
    },
});
