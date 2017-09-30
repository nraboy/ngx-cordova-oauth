import { OAuthProvider, IOAuthOptions } from "../provider";
import { utils } from '../utility';

/*
 * Integration with Untappd
 */
export interface IUntappedOptions extends IOAuthOptions {
}

export class Untappd extends OAuthProvider {

    options: IUntappedOptions;
    protected authUrl: string = 'https://untappd.com/oauth/authenticate/';
    protected defaults: Object = {
        responseType: 'token'
      };

    constructor(options: IUntappedOptions = {}) {
        super(options);
    }

    protected optionsToDialogUrl(options: any): string {
        utils.defaults(options, this.defaults)

        //Had to override this method to change the OAuth spec redirect_uri to redirect_url
        let url = `${this.authUrl}?client_id=${options.clientId}&redirect_url=${options.redirectUri}`;

        if (options.appScope) {
            url += `&scope=${this.serializeAppScope(options.appScope)}`;
        }

        if (options.state) {
            url += `&state=${options.state}`;
        }

        if (options.responseType) {
            url += `&response_type=${options.responseType}`;
        }

        return url;
      }

}
