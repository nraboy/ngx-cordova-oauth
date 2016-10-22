import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using VK oauth
 * @deprecated
 */
export interface IVKOptions extends IOAuthOptions {
}

export class VK extends OAuthProvider {
    options: IVKOptions;
    protected authUrl: string = 'https://oauth.vk.com/authorize';
    protected defaults: Object = {
        responseType: 'token',
        redirectUri: 'https://oauth.vk.com/blank.html'
    };

    constructor(options: IVKOptions = {}) {
        super(options);

        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options) {
        let url = super.optionsToDialogUrl(options);

        if (options.display) {
            url += `&display=${options.display}`;
        }

        if (options.v) {
            url += `&v=${options.v}`;
        }

        if (options.revoke) {
            url += `&revoke=${options.revoke}`;
        }

        return url;
    }
}