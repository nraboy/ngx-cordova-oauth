import { OAuthProvider, IOAuthOptions } from "../provider";
export interface IVKOptions extends IOAuthOptions {
    v?: string;
    display?: string;
    revoke?: string;
}
export declare class VK extends OAuthProvider {
    options: IVKOptions;
    protected authUrl: string;
    protected defaults: Object;
    constructor(options?: IVKOptions);
    protected optionsToDialogUrl(options: any): string;
}
