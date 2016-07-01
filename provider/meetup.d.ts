import { OAuthProvider, IOAuthOptions } from "../provider";
export interface IMeetupOptions extends IOAuthOptions {
}
export declare class Meetup extends OAuthProvider {
    options: IMeetupOptions;
    protected authUrl: string;
    protected defaults: Object;
    constructor(options?: IMeetupOptions);
}
