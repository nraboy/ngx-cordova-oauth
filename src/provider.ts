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

    parseResponseInUrl(url) {
      const response = utils.parseQueryString(url);

      if (!this.isValid(response)) {
        const error = new Error(`Problem authenticating with ${this.name}`);

        Object.defineProperty(error, 'response', { value: response });
        throw error;
      }

      return response;
    }

    dialogUrl() {
      return this.optionsToDialogUrl(this.options);
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
