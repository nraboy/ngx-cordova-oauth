/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
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
    OauthProvider.prototype.login = function (options) {
        if (options === void 0) { options = {}; }
        throw Error("login() not implimented for this provider");
    };
    return OauthProvider;
})();
exports.OauthProvider = OauthProvider;
//# sourceMappingURL=oauth.js.map