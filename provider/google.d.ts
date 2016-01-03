import { IOauthProvider } from "../oauth";
export interface IGoogleOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
}
export declare class Google implements IOauthProvider {
    googleOptions: IGoogleOptions;
    flowUrl: String;
    constructor(options?: IGoogleOptions);
    login(): Promise<{}>;
}
