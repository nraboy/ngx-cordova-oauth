"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oauth_1 = require('../oauth');
function ensureEnvIsValid() {
    if (!window.cordova) {
        throw new Error('Cannot authenticate via a web browser');
    }
    if (!window.cordova.InAppBrowser) {
        throw new Error('The Apache Cordova InAppBrowser plugin was not found and is required');
    }
}
var OauthCordova = (function (_super) {
    __extends(OauthCordova, _super);
    function OauthCordova() {
        _super.apply(this, arguments);
        this.defaultWindowOptions = {
            location: 'no',
            clearsessioncache: 'yes',
            clearcache: 'yes'
        };
    }
    OauthCordova.prototype.openDialog = function (url, windowParams, options) {
        if (options === void 0) { options = {}; }
        var params = this.serializeOptions(windowParams);
        return new Promise(function (resolve, reject) {
            try {
                ensureEnvIsValid();
            }
            catch (error) {
                return reject(error);
            }
            var browserRef = window.cordova.InAppBrowser.open(url, '_blank', params);
            var exitListener = function () { return reject(new Error("The \"" + options.providerName + "\" sign in flow was canceled")); };
            browserRef.addEventListener('loaderror', function () {
                browserRef.removeEventListener('exit', exitListener);
                browserRef.close();
                reject(new Error("Error loading login page of \"" + options.providerName + "\""));
            });
            browserRef.addEventListener('loadstart', function (event) {
                if (event.url.indexOf(options.resolveOnUri) === 0) {
                    browserRef.removeEventListener('exit', exitListener);
                    browserRef.close();
                    resolve(event);
                }
            });
            return browserRef.addEventListener('exit', exitListener);
        });
    };
    return OauthCordova;
}(oauth_1.Oauth));
exports.OauthCordova = OauthCordova;
