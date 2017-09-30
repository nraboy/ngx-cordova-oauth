import { OAuthProvider, IOAuthOptions } from "../provider";

export class Runkeeper extends OAuthProvider {

  constructor(options?: IOAuthOptions) {
    super(options);
    this.authUrl = 'https://runkeeper.com/apps/authorize';
    this.defaults = {
      responseType: 'code'
    };
  }
}
