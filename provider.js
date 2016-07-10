"use strict";
var utility_1 = require('./utility');
var DEFAULTS = {
    redirectUri: 'http://localhost/callback'
};
var OAuthProvider = (function () {
    function OAuthProvider(options) {
        if (options === void 0) { options = {}; }
        this.APP_SCOPE_DELIMITER = ',';
        this.authUrl = '';
        this.defaults = {};
        this.options = utility_1.utils.defaults(options, DEFAULTS);
    }
    Object.defineProperty(OAuthProvider.prototype, "name", {
        get: function () {
            return this.constructor.name || this.authUrl;
        },
        enumerable: true,
        configurable: true
    });
    OAuthProvider.prototype.login = function (config) {
        var _this = this;
        var options = config || this.options;
        if (!options.clientId) {
            throw Error("A " + this.name + " client id must exist");
        }
        var url = this.optionsToDialogUrl(options);
        return new Promise(function (resolve, reject) {
            var browserRef = window.cordova.InAppBrowser
                .open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            var exitListener = function () { return reject("The \"" + _this.name + "\" sign in flow was canceled"); };
            browserRef.addEventListener('loadstart', function (event) {
                if (event.url.indexOf(options.redirectUri) === 0) {
                    browserRef.removeEventListener('exit', exitListener);
                    browserRef.close();
                    var parsedResponse = utility_1.utils.parseQueryString(event.url);
                    if (_this.isValid(parsedResponse)) {
                        resolve(parsedResponse);
                    }
                    else {
                        var error = new Error("Problem authenticating with " + _this.name);
                        Object.defineProperty(error, 'response', { value: parsedResponse });
                        reject(error);
                    }
                }
            });
            browserRef.addEventListener('exit', exitListener);
        });
    };
    OAuthProvider.prototype.optionsToDialogUrl = function (options) {
        utility_1.utils.defaults(options, this.defaults);
        var url = this.authUrl + "?client_id=" + options.clientId + "&redirect_uri=" + options.redirectUri;
        if (options.appScope) {
            url += "&scope=" + this.serializeAppScope(options.appScope);
        }
        if (options.state) {
            url += "&state=" + options.state;
        }
        if (options.responseType) {
            url += "&response_type=" + options.responseType;
        }
        return url;
    };
    OAuthProvider.prototype.serializeAppScope = function (scope) {
        return typeof scope.join === 'function' ? scope.join(this.APP_SCOPE_DELIMITER) : scope;
    };
    OAuthProvider.prototype.isValid = function (response) {
        return !response.error && (response.code || response['access_token']);
    };
    return OAuthProvider;
}());
exports.OAuthProvider = OAuthProvider;
