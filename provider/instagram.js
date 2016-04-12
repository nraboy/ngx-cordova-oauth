"use strict";
var utility_1 = require("../utility");
var PROVIDER_NAME = "Instagram";
var Instagram = (function () {
    function Instagram(options) {
        if (options === void 0) { options = {}; }
        if (!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        var scope = '';
        if (!options.appScope && options.appScope.length > 0) {
            scope = '&scope=' + options.appScope.join('+');
        }
        this.instagramOptions = options;
        this.instagramOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.instagramOptions.responseType = options.hasOwnProperty("response_type") ? options.responseType : "token";
        this.flowUrl = "https://api.instagram.com/oauth/authorize?client_id=" + this.instagramOptions.clientId + "&redirect_uri=" + this.instagramOptions.redirectUri + scope + "&response_type=" + this.instagramOptions.responseType;
    }
    Instagram.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var browserRef = window.cordova.InAppBrowser.open(_this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
                if ((event.url).indexOf(_this.instagramOptions.redirectUri) === 0) {
                    browserRef.removeEventListener("exit", function (event) { });
                    browserRef.close();
                    var parsedResponse = (new utility_1.OauthUtility()).parseImplicitResponse(((event.url).split("#")[1]).split("&"));
                    if (parsedResponse) {
                        resolve(parsedResponse);
                    }
                    else {
                        reject("Problem authenticating with " + PROVIDER_NAME);
                    }
                }
            });
            browserRef.addEventListener("exit", function (event) {
                reject("The " + PROVIDER_NAME + " sign in flow was canceled");
            });
        });
    };
    return Instagram;
}());
exports.Instagram = Instagram;
