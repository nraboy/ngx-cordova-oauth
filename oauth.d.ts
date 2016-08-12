export declare class CordovaOauth {
    _provider: IOauthProvider;
    constructor(provider: IOauthProvider);
    login(config: any, browserOptions: any): Promise<{}>;
}
export interface IOauthProvider {
    login(options: Object, browserOptions?: Object): Promise<Object>;
}
