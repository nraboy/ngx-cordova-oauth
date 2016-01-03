import { IOauthProvider } from "../oauth";
export interface IMeetupOptions {
    clientId?: String;
    redirectUri?: String;
}
export declare class Meetup implements IOauthProvider {
    meetupOptions: IMeetupOptions;
    flowUrl: String;
    constructor(options?: IMeetupOptions);
    login(): Promise<{}>;
}
