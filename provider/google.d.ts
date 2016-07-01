import { OAuthProvider, IOAuthOptions } from "../provider";
export interface IGoogleOptions extends IOAuthOptions {
}
export declare class Google extends OAuthProvider {
    options: IGoogleOptions;
    protected authUrl: string;
    protected APP_SCOPE_DELIMITER: string;
    protected defaults: Object;
    constructor(options?: IGoogleOptions);
    protected optionsToDialogUrl(options: any): string;
}
