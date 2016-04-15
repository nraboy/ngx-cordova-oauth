// Spotify web api authorization guide and scopes
// https://developer.spotify.com/web-api/authorization-guide
// https://developer.spotify.com/web-api/using-scopes/

import { IOauthProvider } from "../oauth";
import { OauthUtility } from "../utility";

declare var window: any;
const PROVIDER_NAME = "Spotify";

/*
 * Configuration options for using Spotify oauth
 */
export interface ISpotifyOptions {
    clientId?: String;
    responseType?:String;
    showDialog?:String;
    appScope?: Array<String>;
    redirectUri?: String;
}

export class Spotify implements IOauthProvider {

    spotifyOptions: ISpotifyOptions;
    flowUrl: String;

    constructor(options: ISpotifyOptions={}) {
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }

        let scope = '';
        if(options.appScope && options.appScope.length > 0) {
            scope = '&scope=' + options.appScope.join(' ');
        }
        this.spotifyOptions = options;
        this.spotifyOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.spotifyOptions.responseType = options.hasOwnProperty("responseType") ? options.responseType : "token";
        this.spotifyOptions.showDialog = options.hasOwnProperty("showDialog") ? options.showDialog : "true";

        //this.flowUrl = "https://api.instagram.com/oauth/authorize?client_id=" + this.instagramOptions.clientId + "&redirect_uri=" + this.instagramOptions.redirectUri + scope + "&response_type=" + this.instagramOptions.responseType;
        this.flowUrl = "https://accounts.spotify.com/authorize?client_id=" + this.spotifyOptions.clientId + '&redirect_uri=' + this.spotifyOptions.redirectUri + '&response_type=' + this.spotifyOptions.responseType + scope +'&show_dialog=' + this.spotifyOptions.showDialog;

        console.log(this.flowUrl);

    }

    login() {
        return new Promise((resolve, reject) => {
            var browserRef = window.cordova.InAppBrowser.open(this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(this.spotifyOptions.redirectUri) === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                    browserRef.close();

                    //var parsedResponse = (new OauthUtility()).parseImplicitResponse(((event.url).split("#")[1]).split("&"));
                    var splitChar = (this.spotifyOptions.responseType === "code") ? "?" : "#";

                    var callbackResponse = (event.url).split(splitChar)[1];
                    var responseParameters = (callbackResponse).split("&");
                    var parameterMap = [];

                    for(var i = 0; i < responseParameters.length; i++) {
                      parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                    }

                    if ((parameterMap["access_token"]!==null && !parameterMap["access_token"] !== undefined) ||  (parameterMap["code"] !== undefined && parameterMap["code"] !== null)){
                      var parsedResponse = parameterMap;
                    }

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
