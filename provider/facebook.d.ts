import { OauthProvider } from "../oauth";
export interface IFacebookOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
    authType?: String;
}
export declare class Facebook extends OauthProvider {
    facebookOptions: IFacebookOptions;
    constructor(options?: IFacebookOptions);
    login(): Promise<{}>;
}
