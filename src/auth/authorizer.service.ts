import { Injectable } from '@nestjs/common';
import { Authorizer } from '@authorizerdev/authorizer-js';

@Injectable()
export class AuthorizerService {
  private authorizer: Authorizer;

  constructor() {
    this.authorizer = new Authorizer({
      authorizerURL: 'https://your-authorizer-instance.com',  // Your Authorizer instance URL
      clientID: 'your-client-id',                             // Your Authorizer Client ID
      redirectURL: 'http://localhost:3000/callback',          // Redirect URL after login/signup
    });
  }

  async signUp(email: string, password: string, name: string) {
    return await this.authorizer.signup({ email, password, confirm_password: password });
  }

  async signIn(email: string, password: string) {
    return await this.authorizer.login({ email, password });
  }

  async verifyToken(token: string) {
    return await this.authorizer.validateJWTToken(token);
  }
}
