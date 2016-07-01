import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Google oauth
 * @deprecated
 */
export interface IGoogleOptions extends IOAuthOptions {
}

export class Google extends OAuthProvider {

    options: IGoogleOptions;
    protected authUrl: string = 'https://accounts.google.com/o/oauth2/auth';
    protected APP_SCOPE_DELIMITER = ' ';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: IGoogleOptions = {}) {
        super(options);

        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options) {
      return super.optionsToDialogUrl(options) + '&approval_prompt=force'
    }

}
