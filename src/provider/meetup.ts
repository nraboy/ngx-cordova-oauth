import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Meetup oauth
 * @deprecated
 */
export interface IMeetupOptions extends IOAuthOptions {
}

export class Meetup extends OAuthProvider {

    options: IMeetupOptions;
    protected authUrl: string = 'https://secure.meetup.com/oauth2/authorize/';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IMeetupOptions = {}) {
        super(options);
    }

}
