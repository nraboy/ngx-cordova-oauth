import { IOauthProvider } from "../oauth";
import { OauthUtility } from "../utility";

declare var window: any;
const PROVIDER_NAME = "Google";

/*
 * Configuration options for using Google oauth
 */
export interface IGoogleOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
}

export class Google implements IOauthProvider {

    googleOptions: IGoogleOptions;
    flowUrl: String;

    constructor(options: IGoogleOptions={}) {
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        if(!options.appScope || options.appScope.length <= 0) {
            throw Error("A " + PROVIDER_NAME + " app scope must exist");
        }
        this.googleOptions = options;
        this.googleOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowUrl = "https://accounts.google.com/o/oauth2/auth?client_id=" + this.googleOptions.clientId + "&redirect_uri=" + this.googleOptions.redirectUri + "&response_type=token&approval_prompt=force&scope=" + this.googleOptions.appScope.join(" ");
    }

    login() {
        return new Promise((resolve, reject) => {
            var browserRef = window.cordova.InAppBrowser.open(this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(this.googleOptions.redirectUri) === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                    browserRef.close();
                    var parsedResponse = (new OauthUtility()).parseImplicitResponse(((event.url).split("#")[1]).split("&"));
                    if (parsedResponse) {
                        resolve(parsedResponse);
                    } else {
                        reject("Problem authenticating with " + PROVIDER_NAME);
                    }
                }
            });
            browserRef.addEventListener("exit", function(event) {
                reject("The " + PROVIDER_NAME + " sign in flow was canceled");
            });
        });
    }

}
