/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */
"use strict";
/*
 * The main driver class for connections to each of the providers.
 */
var CordovaOauth = (function () {
    function CordovaOauth(provider) {
        this._provider = provider;
    }
    CordovaOauth.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (window.cordova) {
                if (window.cordova.InAppBrowser) {
                    _this._provider.login().then(function (success) {
                        resolve(success);
                    }, function (error) {
                        reject(error);
                    });
                }
                else {
                    reject("The Apache Cordova InAppBrowser plugin was not found and is required");
                }
            }
            else {
                reject("Cannot authenticate via a web browser");
            }
        });
    };
    return CordovaOauth;
}());
exports.CordovaOauth = CordovaOauth;
