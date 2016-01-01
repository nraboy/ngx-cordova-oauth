/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */

export class CordovaOauth {

    _provider: OauthProvider;

    constructor(Provider: IOauthProvider, options) {
        this._provider = new Provider(options);
    }

    login() {
        return this._provider.login();
    }

}

export interface IOauthProvider {
    new (options: Object): OauthProvider;
}

export class OauthProvider {

    login() {
        throw Error("login() not implimented for this provider");
    }

}
