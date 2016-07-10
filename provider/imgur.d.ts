import { OAuthProvider, IOAuthOptions } from "../provider";
export interface IImgurOptions extends IOAuthOptions {
}
export declare class Imgur extends OAuthProvider {
    options: IImgurOptions;
    protected authUrl: string;
    protected defaults: Object;
    constructor(options?: IImgurOptions);
}
