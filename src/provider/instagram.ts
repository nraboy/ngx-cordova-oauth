import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Instagram oauth
 * @deprecated
 */
export interface IInstagramOptions extends IOAuthOptions {
}

export class Instagram extends OAuthProvider {

    options: IInstagramOptions;
    protected authUrl: string = 'https://api.instagram.com/oauth/authorize';
    protected APP_SCOPE_DELIMITER: string = '+';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IInstagramOptions = {}) {
      super(options);
    }
}
