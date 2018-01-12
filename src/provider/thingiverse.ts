import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Thingiverse oauth
 * @deprecated
 */
export interface IThingiverseOptions extends IOAuthOptions {
}

export class Thingiverse extends OAuthProvider {

    options: IThingiverseOptions;
    protected authUrl: string = 'https://www.thingiverse.com/login/oauth/authorize';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IThingiverseOptions = {}) {
        super(options);
    }
}
