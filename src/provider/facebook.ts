import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Facebook oauth
 */
export interface IFacebookOptions extends IOAuthOptions {
    authType?: string;
}

export class Facebook extends OAuthProvider {

    options: IFacebookOptions;
    protected authUrl: string = 'https://www.facebook.com/v2.0/dialog/oauth';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IFacebookOptions = {}) {
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

      return url;
    }

}
