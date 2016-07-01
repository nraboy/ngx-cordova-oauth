// Spotify web api authorization guide and scopes
// https://developer.spotify.com/web-api/authorization-guide
// https://developer.spotify.com/web-api/using-scopes/

import { OAuthProvider } from "../provider";

export class Spotify extends OAuthProvider {
    protected authUrl: string = 'https://accounts.spotify.com/authorize';
    protected APP_SCOPE_DELIMITER = ' ';
    protected defaults: Object = {
      responseType: 'token'
    };
}
