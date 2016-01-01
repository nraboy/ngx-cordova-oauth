import { OauthProvider } from "../oauth";
export interface IGoogleOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
}
export declare class Google extends OauthProvider {
    googleOptions: IGoogleOptions;
    flowUrl: String;
    constructor(options?: IGoogleOptions);
    login(): Promise<{}>;
}
