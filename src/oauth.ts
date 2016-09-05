/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */

import { OAuthProvider } from './provider';
import { utils } from './utility';

/*
 * The main driver class for connections to each of the providers.
 */
export class Oauth {
    defaultWindowOptions: Object = {};

    login(provider: OAuthProvider, windowOptions: Object = {}) {
      console.warn(`
        new CordovaOauth().login(...) is deprecated and will be removed in the next release.
        Please use new CordovaOauth().logInVia(...) instead.
      `)
      return this.logInVia(provider, windowOptions)
    }

    logInVia(provider: OAuthProvider, windowOptions: Object = {}) {
        const url = provider.dialogUrl();

        return this.openDialog(url, utils.defaults(windowOptions, this.defaultWindowOptions), {
          resolveOnUri: provider.options.redirectUri,
          providerName: provider.name
        }).then((event) => {
          return provider.parseResponseInUrl(event.url);
        })
    }

    protected serializeOptions(options: Object) {
      const chunks = [];

      for (const prop in options) {
        if (options.hasOwnProperty(prop)) {
          chunks.push(`${prop}=${options[prop]}`);
        }
      }

      return chunks.join(',');
    }

    protected openDialog(url: string, windowParams: Object, options: any = {}): Promise<any> {
      return Promise.reject(new Error('Not implemented'));
    }
}

/*
 * All providers must have the functions and variables that exist in this interface.  Keeps
 * consistency between the providers.
 */
export interface IOauthProvider {
    parseResponseInUrl(url: string): Object;
}
