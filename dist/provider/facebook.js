var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oauth_1 = require("../oauth");
var PROVIDER_NAME = "Facebook";
var Facebook = (function (_super) {
    __extends(Facebook, _super);
    function Facebook(options) {
        if (options === void 0) { options = {}; }
        _super.call(this);
        if (!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        if (!options.appScope || options.appScope.length <= 0) {
            throw Error("A " + PROVIDER_NAME + " app scope must exist");
        }
        this.facebookOptions = options;
        this.facebookOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.facebookOptions.authType = options.hasOwnProperty("authType") ? options.authType : null;
    }
    Facebook.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (window.cordova) {
                var flowUrl = "https://www.facebook.com/v2.0/dialog/oauth?client_id=" + _this.facebookOptions.clientId + "&redirect_uri=" + _this.facebookOptions.redirectUri + "&response_type=token&scope=" + _this.facebookOptions.appScope.join(",");
                if (_this.facebookOptions.authType) {
                    flowUrl += "&auth_type=" + _this.facebookOptions.authType;
                }
                var browserRef = window.cordova.InAppBrowser.open(flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                browserRef.addEventListener("loadstart", function (event) {
                    if ((event.url).indexOf(_this.facebookOptions.redirectUri) === 0) {
                        browserRef.removeEventListener("exit", function (event) { });
                        browserRef.close();
                        var callbackResponse = (event.url).split("#")[1];
                        var responseParameters = (callbackResponse).split("&");
                        var parameterMap = {};
                        for (var i = 0; i < responseParameters.length; i++) {
                            parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                        }
                        if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                            resolve(parameterMap);
                        }
                        else {
                            if ((event.url).indexOf("error_code=100") !== 0) {
                                reject(PROVIDER_NAME + " returned error_code=100: Invalid permissions");
                            }
                            else {
                                reject("Problem authenticating with " + PROVIDER_NAME);
                            }
                        }
                    }
                });
                browserRef.addEventListener('exit', function (event) {
                    reject("The " + PROVIDER_NAME + " sign in flow was canceled");
                });
            }
            else {
                reject("Cannot authenticate with " + PROVIDER_NAME + " via a web browser");
            }
        });
    };
    return Facebook;
})(oauth_1.OauthProvider);
exports.Facebook = Facebook;
//# sourceMappingURL=facebook.js.map