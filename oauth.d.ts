import { OAuthProvider } from './provider';
export declare class Oauth {
    defaultWindowOptions: Object;
    login(provider: OAuthProvider, windowOptions?: Object): Promise<Object>;
    logInVia(provider: OAuthProvider, windowOptions?: Object): Promise<Object>;
    protected serializeOptions(options: Object): string;
    protected openDialog(url: string, windowParams: Object, options?: any): Promise<any>;
}
export interface IOauthProvider {
    parseResponseInUrl(url: string): Object;
}
