import { IOauthProvider } from "../oauth";
export interface IImgurOptions {
    clientId?: String;
    redirectUri?: String;
}
export declare class Imgur implements IOauthProvider {
    imgurOptions: IImgurOptions;
    flowUrl: String;
    constructor(options?: IImgurOptions);
    login(): Promise<{}>;
}
