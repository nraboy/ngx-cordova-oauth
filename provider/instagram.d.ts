import { IOauthProvider } from "../oauth";
export interface IInstagramOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
    responseType?: String;
}
export declare class Instagram implements IOauthProvider {
    instagramOptions: IInstagramOptions;
    flowUrl: String;
    constructor(options?: IInstagramOptions);
    login(): Promise<{}>;
}
