import { IOauthProvider } from './oauth';
export interface IOAuthOptions {
    clientId?: string;
    appScope?: string[];
    redirectUri?: string;
    responseType?: string;
    state?: string;
}
export declare class OAuthProvider implements IOauthProvider {
    options: IOAuthOptions;
    protected APP_SCOPE_DELIMITER: string;
    protected authUrl: string;
    protected defaults: Object;
    constructor(options?: IOAuthOptions);
    name: string;
    login(config: any, browserOptions?: Object): Promise<{}>;
    protected serializeBrowserOptions(options: Object): string;
    protected optionsToDialogUrl(options: any): string;
    protected serializeAppScope(scope: any): any;
    protected isValid(response: any): any;
}
