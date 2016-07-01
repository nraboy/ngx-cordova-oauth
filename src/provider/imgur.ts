import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Imgur oauth
 * @deprecated
 */
export interface IImgurOptions extends IOAuthOptions {
}

export class Imgur extends OAuthProvider {

    options: IImgurOptions;
    protected authUrl: string = 'https://api.imgur.com/oauth2/authorize';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IImgurOptions = {}) {
        super(options);
    }
}
