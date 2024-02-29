import { Hex } from 'viem';

export interface IBridgeRange {
    readonly min: number;
    readonly max: number;
}

export interface IFixedRange extends IBridgeRange {}

export interface IDelayRange extends IBridgeRange {}

export interface IRouteStep {
    readonly amountIn: bigint;
    readonly amountOut: bigint;
    readonly assetIn: Hex;
    readonly assetOut: Hex;
    readonly pool: Hex;
}

export interface IPoolObject {
    readonly poolAddress: Hex;
    readonly toApprove: Hex;
    readonly firstTokenAmount: { range: IBridgeRange; fixed: IFixedRange };
    readonly secondTokenAmount: { range: IBridgeRange; fixed: IFixedRange };
    readonly firstTokenName: string;
    readonly secondTokenName: string;
    readonly firstTokenAddress: Hex;
    readonly secondTokenAddress: Hex;
}

export interface IReward {
    readonly amount: bigint;
    readonly denom: string;
}

export interface IUser {
    readonly email: string;
    readonly password: string;
}

export interface ICaptcha {
    readonly lotNumber: string;
    readonly captchaOutput: string;
    readonly passToken: string;
    readonly genTime: string;
}

export interface IDatabase {}

export interface IState extends IDatabase {
    readonly accountIndex: number;
    readonly remainingModules: number;
}

export interface IHeader extends IDatabase {
    acceptLanguage: string;
    secChUa: string;
    userAgent: string;
}

export interface IHeaderAddress extends IHeader {
    address: Hex;
}
