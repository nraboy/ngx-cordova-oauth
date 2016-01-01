import { OauthProvider } from "../oauth";
import { Http } from "angular2/http";

declare var window: any;
const PROVIDER_NAME = "Facebook";

/*
 * Configuration options for using Facebook oauth
 */
export interface IFacebookOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
    authType?: String;
}

export class Facebook extends OauthProvider {

    facebookOptions: IFacebookOptions;

    constructor(options: IFacebookOptions={}) {
        super();
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        if(!options.appScope || options.appScope.length <= 0) {
            throw Error("A " + PROVIDER_NAME + " app scope must exist");
        }
        this.facebookOptions = options;
        this.facebookOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.facebookOptions.authType = options.hasOwnProperty("authType") ? options.authType : null;
    }

    login() {
        return new Promise((resolve, reject) => {
            if (window.cordova) {
                var flowUrl = "https://www.facebook.com/v2.0/dialog/oauth?client_id=" + this.facebookOptions.clientId + "&redirect_uri=" + this.facebookOptions.redirectUri + "&response_type=token&scope=" + this.facebookOptions.appScope.join(",");
                if (this.facebookOptions.authType) {
                    flowUrl += "&auth_type=" + this.facebookOptions.authType;
                }
                var browserRef = window.cordova.InAppBrowser.open(flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                browserRef.addEventListener("loadstart", (event) => {
                    if ((event.url).indexOf(this.facebookOptions.redirectUri) === 0) {
                        browserRef.removeEventListener("exit", (event) => {});
                        browserRef.close();
                        var callbackResponse = (event.url).split("#")[1];
                        var responseParameters = (callbackResponse).split("&");
                        var parameterMap = {};
                        for (var i = 0; i < responseParameters.length; i++) {
                            parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                        }
                        if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                            resolve(parameterMap);
                        } else {
                            if ((event.url).indexOf("error_code=100") !== 0) {
                                reject(PROVIDER_NAME + " returned error_code=100: Invalid permissions");
                            } else {
                                reject("Problem authenticating with " + PROVIDER_NAME);
                            }
                        }
                    }
                });
                browserRef.addEventListener('exit', function(event) {
                    reject("The " + PROVIDER_NAME + " sign in flow was canceled");
                });
            } else {
                reject("Cannot authenticate with " + PROVIDER_NAME + " via a web browser");
            }
        });
    }

}
