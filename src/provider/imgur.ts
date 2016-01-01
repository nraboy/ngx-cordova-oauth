import { OauthProvider } from "../oauth";
import { OauthUtility } from "../utility";

declare var window: any;
const PROVIDER_NAME = "Imgur";

/*
 * Configuration options for using Imgur oauth
 */
export interface IImgurOptions {
    clientId?: String;
    redirectUri?: String;
}

export class Imgur extends OauthProvider {

    imgurOptions: IImgurOptions;
    flowUrl: String;

    constructor(options: IImgurOptions={}) {
        super();
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        this.imgurOptions = options;
        this.imgurOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowUrl = "https://api.imgur.com/oauth2/authorize?client_id=" + this.imgurOptions.clientId + "&redirect_uri=" + this.imgurOptions.redirectUri + "&response_type=token";
    }

    login() {
        return new Promise((resolve, reject) => {
            if (window.cordova) {
                if (window.cordova.InAppBrowser) {
                    var browserRef = window.cordova.InAppBrowser.open(this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                    browserRef.addEventListener("loadstart", (event) => {
                        if ((event.url).indexOf(this.imgurOptions.redirectUri) === 0) {
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
                } else {
                    reject("The Apache Cordova InAppBrowser plugin was not found and is required");
                }
            } else {
                reject("Cannot authenticate with " + PROVIDER_NAME + " via a web browser");
            }
        });
    }

}
