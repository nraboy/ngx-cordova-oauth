var utility_1 = require("../utility");
var PROVIDER_NAME = "Google";
var Google = (function () {
    function Google(options) {
        if (options === void 0) { options = {}; }
        if (!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        if (!options.appScope || options.appScope.length <= 0) {
            throw Error("A " + PROVIDER_NAME + " app scope must exist");
        }
        this.googleOptions = options;
        this.googleOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowUrl = "https://accounts.google.com/o/oauth2/auth?client_id=" + this.googleOptions.clientId + "&redirect_uri=" + this.googleOptions.redirectUri + "&response_type=token&approval_prompt=force&scope=" + this.googleOptions.appScope.join(" ");
    }
    Google.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var browserRef = window.cordova.InAppBrowser.open(_this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
                if ((event.url).indexOf(_this.googleOptions.redirectUri) === 0) {
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
    return Google;
})();
exports.Google = Google;
