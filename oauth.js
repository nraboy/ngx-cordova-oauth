/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */
var CordovaOauth = (function () {
    function CordovaOauth(Provider, options) {
        this._provider = new Provider(options);
    }
    CordovaOauth.prototype.login = function () {
        return this._provider.login();
    };
    return CordovaOauth;
})();
exports.CordovaOauth = CordovaOauth;
var OauthProvider = (function () {
    function OauthProvider() {
    }
    OauthProvider.prototype.login = function () {
        throw Error("login() not implimented for this provider");
    };
    return OauthProvider;
})();
exports.OauthProvider = OauthProvider;
