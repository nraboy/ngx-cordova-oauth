import { OAuthProvider, IOAuthOptions } from "../provider";

export class Polar extends OAuthProvider {

  constructor(options?: IOAuthOptions) {
    super(options);
    this.authUrl = 'https://flow.polar.com/oauth2/authorization';
    this.defaults = {
      responseType: 'code'
    };
  }
}
