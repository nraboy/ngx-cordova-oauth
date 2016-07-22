import { OAuthProvider } from "../provider";
export declare class LinkedIn extends OAuthProvider {
    protected authUrl: string;
    protected APP_SCOPE_DELIMITER: string;
    protected defaults: Object;
}
