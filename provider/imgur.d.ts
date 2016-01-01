import { OauthProvider } from "../oauth";
export interface IImgurOptions {
    clientId?: String;
    redirectUri?: String;
}
export declare class Imgur extends OauthProvider {
    imgurOptions: IImgurOptions;
    flowUrl: String;
    constructor(options?: IImgurOptions);
    login(): Promise<{}>;
}
