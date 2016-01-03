/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */

declare var window: any;

/*
 * The main driver class for connections to each of the providers.
 */
export class CordovaOauth {

    _provider: IOauthProvider;

    constructor(provider: IOauthProvider) {
        this._provider = provider;
    }

    login() {
        return new Promise((resolve, reject) => {
            if (window.cordova) {
                if (window.cordova.InAppBrowser) {
                    this._provider.login().then((success) => {
                        resolve(success);
                    }, (error) => {
                        reject(error);
                    });
                } else {
                    reject("The Apache Cordova InAppBrowser plugin was not found and is required");
                }
            } else {
                reject("Cannot authenticate via a web browser");
            }
        });
    }

}

/*
 * All providers must have the functions and variables that exist in this interface.  Keeps
 * consistency between the providers.
 */
export interface IOauthProvider {
    login(): Promise<Object>;
}
