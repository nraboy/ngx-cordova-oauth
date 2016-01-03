var utility_1 = require("../utility");
var PROVIDER_NAME = "Meetup";
var Meetup = (function () {
    function Meetup(options) {
        if (options === void 0) { options = {}; }
        if (!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        this.meetupOptions = options;
        this.meetupOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowUrl = "https://secure.meetup.com/oauth2/authorize/?client_id=" + this.meetupOptions.clientId + "&redirect_uri=" + this.meetupOptions.redirectUri + "&response_type=token";
    }
    Meetup.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var browserRef = window.cordova.InAppBrowser.open(_this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", function (event) {
                if ((event.url).indexOf(_this.meetupOptions.redirectUri) === 0) {
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
    return Meetup;
})();
exports.Meetup = Meetup;
