import { IOauthProvider } from "../oauth";
export interface IFacebookOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
    authType?: String;
}
export declare class Facebook implements IOauthProvider {
    facebookOptions: IFacebookOptions;
    flowUrl: String;
    constructor(options?: IFacebookOptions);
    login(): Promise<{}>;
}
