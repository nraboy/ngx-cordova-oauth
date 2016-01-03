import { IOauthProvider } from "../oauth";
import { OauthUtility } from "../utility";

declare var window: any;
const PROVIDER_NAME = "Meetup";

/*
 * Configuration options for using Meetup oauth
 */
export interface IMeetupOptions {
    clientId?: String;
    redirectUri?: String;
}

export class Meetup implements IOauthProvider {

    meetupOptions: IMeetupOptions;
    flowUrl: String;

    constructor(options: IMeetupOptions={}) {
        if(!options.clientId || options.clientId == "") {
            throw Error("A " + PROVIDER_NAME + " client id must exist");
        }
        this.meetupOptions = options;
        this.meetupOptions.redirectUri = options.hasOwnProperty("redirectUri") ? options.redirectUri : "http://localhost/callback";
        this.flowUrl = "https://secure.meetup.com/oauth2/authorize/?client_id=" + this.meetupOptions.clientId + "&redirect_uri=" + this.meetupOptions.redirectUri + "&response_type=token";
    }

    login() {
        return new Promise((resolve, reject) => {
            var browserRef = window.cordova.InAppBrowser.open(this.flowUrl, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(this.meetupOptions.redirectUri) === 0) {
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
