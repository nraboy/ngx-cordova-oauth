export declare class CordovaOauth {
    _provider: IOauthProvider;
    constructor(provider: IOauthProvider);
    login(): Promise<{}>;
}
export interface IOauthProvider {
    login(): Promise<Object>;
}
