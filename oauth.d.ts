import { OAuthProvider } from './provider';
export declare class CordovaOauth {
    login(provider: OAuthProvider, browserOptions?: Object): Promise<{}>;
    logInVia(provider: OAuthProvider, browserOptions?: Object): Promise<{}>;
    protected serializeBrowserOptions(options: Object): string;
}
export interface IOauthProvider {
    parseResponseInUrl(url: string): Object;
}
