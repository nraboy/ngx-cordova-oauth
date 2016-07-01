import { OAuthProvider, IOAuthOptions } from "../provider";
export interface IInstagramOptions extends IOAuthOptions {
}
export declare class Instagram extends OAuthProvider {
    options: IInstagramOptions;
    protected authUrl: string;
    protected APP_SCOPE_DELIMITER: string;
    protected defaults: Object;
    constructor(options?: IInstagramOptions);
}
