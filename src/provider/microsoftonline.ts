import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Facebook oauth
 */
export interface IMicrosoftOnlineOptions extends IOAuthOptions {
    responseType: string = 'code';
    responseMode: string = 'query';
    authType?: string;
    prompt?: string;
    loginHint?: string;
    domainHint?: string;
}

export class MicrosoftOnline extends OAuthProvider {

    options: IMicrosoftOnlineOptions;
    protected authUrl: string = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IMicrosoftOnlineOptions = {}) {
        super(options);

        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options) {
      let url = super.optionsToDialogUrl(options);

      if (options.authType) {
          url += `&auth_type=${options.authType}`;
      }
      if (options.loginHint) {
          url += `&login_hint=${options.loginHint}`;
      }
      if (options.domainHint) {
          url += `&domain_hint=${options.domainHint}`;
      }

      url += `&response_type=${options.responseType}`;
      url += `&response_mode=${options.responseMode}`;

      return url;
    }

}
