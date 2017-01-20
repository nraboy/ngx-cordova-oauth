import { OAuthProvider, IOAuthOptions } from "../provider";

export class Strava extends OAuthProvider {
    protected authUrl: string = 'https://www.strava.com/oauth/authorize';
    protected defaults: Object = {
      responseType: 'code'
    };
}
