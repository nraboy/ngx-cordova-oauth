/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */

import { OAuthProvider } from './provider';
import { utils } from './utility';

declare var window: any;

const DEFAULT_BROWSER_OPTIONS = {
  location: 'no',
  clearsessioncache: 'yes',
  clearcache: 'yes'
};

/*
 * The main driver class for connections to each of the providers.
 */
export class CordovaOauth {

    login(provider: OAuthProvider, browserOptions: Object = {}) {
      console.warn(`
        new CordovaOauth().login(...) is deprecated and will be removed in the next release.
        Please use new CordovaOauth().logInVia(...) instead.
      `)
      return this.logInVia(provider, browserOptions)
    }

    logInVia(provider: OAuthProvider, browserOptions: Object = {}) {
        const url = provider.dialogUrl();
        const windowParams = this.serializeBrowserOptions(
          utils.defaults(browserOptions, DEFAULT_BROWSER_OPTIONS)
        );

        return new Promise((resolve, reject) => {
            if (!window.cordova) {
                return reject(new Error('Cannot authenticate via a web browser'));
            }

            if (!window.cordova.InAppBrowser) {
                return reject(new Error('The Apache Cordova InAppBrowser plugin was not found and is required'));
            }

            const browserRef = window.cordova.InAppBrowser.open(url, '_blank', windowParams);
            const exitListener = () => reject(`The "${provider.name}" sign in flow was canceled`);

            browserRef.addEventListener('loadstart', (event) => {
                if (event.url.indexOf(provider.options.redirectUri) === 0) {
                    browserRef.removeEventListener('exit', exitListener);
                    browserRef.close();

                    try {
                      resolve(provider.parseResponseInUrl(event.url));
                    } catch (e) {
                      reject(e);
                    }
                }
            })
            return browserRef.addEventListener('exit', exitListener);
        })
    }

    protected serializeBrowserOptions(options: Object) {
      const chunks = [];

      for (const prop in options) {
        if (options.hasOwnProperty(prop)) {
          chunks.push(`${prop}=${options[prop]}`);
        }
      }

      return chunks.join(',');
    }
}

/*
 * All providers must have the functions and variables that exist in this interface.  Keeps
 * consistency between the providers.
 */
export interface IOauthProvider {
    parseResponseInUrl(url: string): Object;
}
