export declare class CordovaOauth {
    _provider: OauthProvider;
    constructor(Provider: IOauthProvider, options: any);
    login(): void;
}
export interface IOauthProvider {
    new (options: Object): OauthProvider;
}
export declare class OauthProvider {
    login(): void;
}
