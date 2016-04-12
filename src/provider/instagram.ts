import { IOauthProvider } from "../oauth";
import { OauthUtility } from "../utility";

declare var window: any;
const PROVIDER_NAME = "Instagram";

/*
 * Configuration options for using Instagram oauth
 */
export interface IInstagramOptions {
    clientId?: String;
    appScope?: Array<String>;
    redirectUri?: String;
    responseType?: String;
}

export class Instagram implements IOauthProvider {

    instagramOptions: IInstagramOptions;
    flowUrl: String;

    constructor(options: IInstagramOptions={}) {
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        
        let scope = '';
        if(!options.appScope && options.appScope.length > 0) {
            scope = '&scope=' + options.appScope.join('+');
        }
        this.instagramOptions = options;
        this.instagramOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.instagramOptions.responseType = options.hasOwnProperty("response_type") ? options.responseType : "token";
        this.flowUrl = "https://api.instagram.com/oauth/authorize?client_id=" + this.instagramOptions.clientId + "&redirect_uri=" + this.instagramOptions.redirectUri + scope + "&response_type=" + this.instagramOptions.responseType;
    }

    login() {
        return new Promise((resolve, reject) => {
            var browserRef = window.cordova.InAppBrowser.open(this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(this.instagramOptions.redirectUri) === 0) {
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
