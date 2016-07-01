import { utils } from './utility';
import { IOauthProvider } from './oauth';

declare var window: any;

export interface IOAuthOptions {
    clientId?: string;
    appScope?: string[];
    redirectUri?: string;
    responseType?: string;
    state?: string;
}

const DEFAULTS = {
  redirectUri: 'http://localhost/callback'
};

const DEFAULT_BROWSER_OPTIONS = {
  location: 'no',
  clearsessioncache: 'yes',
  clearcache: 'yes'
};

export class OAuthProvider implements IOauthProvider {
    options: IOAuthOptions;
    protected APP_SCOPE_DELIMITER: string = ',';
    protected authUrl: string = '';
    protected defaults: Object = {};

    constructor(options: IOAuthOptions = {}) {
        this.options = utils.defaults(options, DEFAULTS);
    }

    get name() {
        return this.constructor.name || this.authUrl;
    }

    login(config, browserOptions: Object = {}) {
        const options = config || this.options;

        if (!options.clientId) {
            throw Error(`A ${this.name} client id must exist`);
        }

        const url = this.optionsToDialogUrl(options);
        const windowParams = this.serializeBrowserOptions(
          utils.defaults(browserOptions, DEFAULT_BROWSER_OPTIONS)
        );

        return new Promise((resolve, reject) => {
            const browserRef = window.cordova.InAppBrowser.open(url, '_blank', windowParams);
            const exitListener = () => reject(`The "${this.name}" sign in flow was canceled`);

            browserRef.addEventListener('loadstart', (event) => {
                if (event.url.indexOf(options.redirectUri) === 0) {
                    browserRef.removeEventListener('exit', exitListener);
                    browserRef.close();
                    const parsedResponse = utils.parseQueryString(event.url);

                    if (this.isValid(parsedResponse)) {
                        resolve(parsedResponse);
                    } else {
                        const error = new Error(`Problem authenticating with ${this.name}`);

                        Object.defineProperty(error, 'response', { value: parsedResponse });
                        reject(error);
                    }
                }
            })
            browserRef.addEventListener('exit', exitListener);
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

    protected optionsToDialogUrl(options: any): string {
        utils.defaults(options, this.defaults)
        let url = `${this.authUrl}?client_id=${options.clientId}&redirect_uri=${options.redirectUri}`;

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

    protected serializeAppScope(scope) {
      return typeof scope.join === 'function' ? scope.join(this.APP_SCOPE_DELIMITER) : scope;
    }

    protected isValid(response) {
        return !response.error && (response.code || response['access_token']);
    }
}
