import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using IdentityServer
 */
export interface IIdentityServerOptions extends IOAuthOptions {
    authType?: string;
    nonce?: string;         /* a nonce value is required if using implicit grant - https://identityserver4.readthedocs.io/en/release/endpoints/authorize.html */
}

export class IdentityServer extends OAuthProvider {

    options: IIdentityServerOptions;
    protected authUrl: string;
    protected defaults: Object = {
      responseType: 'id_token token',
      nonce: 'zxy'
    };

    /*
     * authUrl is your server endpoint (eg. http://localhost:5000/connect/authorize)
     */
    constructor(authUrl: string, options: IIdentityServerOptions = {}) {
        super(options);
        this.authUrl = authUrl;
        
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options) {
      let url = super.optionsToDialogUrl(options);

      if (options.authType) {
          url += `&auth_type=${options.authType}`;
      }
      if(options.nonce) {
        url += `&nonce=${options.nonce}`;   
      }
      return url;
    }

}
