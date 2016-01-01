import { OauthProvider } from "../oauth";
export interface IMeetupOptions {
    clientId?: String;
    redirectUri?: String;
}
export declare class Meetup extends OauthProvider {
    meetupOptions: IMeetupOptions;
    flowUrl: String;
    constructor(options?: IMeetupOptions);
    login(): Promise<{}>;
}
