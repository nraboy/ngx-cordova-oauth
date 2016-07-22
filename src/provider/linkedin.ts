import { OAuthProvider } from "../provider";

export class LinkedIn extends OAuthProvider {
  protected authUrl: string = 'https://www.linkedin.com/oauth/v2/authorization'
  protected defaults: Object = {
    responseType: 'code'
  };
}
