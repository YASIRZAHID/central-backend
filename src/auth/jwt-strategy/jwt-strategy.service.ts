import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksClient from 'jwks-rsa';
import { jwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwksClient = jwksClient({
    jwksUri: 'https://your-authorizer-instance.com/.well-known/jwks.json', // Replace with your Authorizer JWKS URI
    cache: true,
    rateLimit: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10 * 60 * 1000, // Cache for 10 minutes
  });

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const { header: { kid } } = jwt.decode(rawJwtToken, { complete: true });
        this.jwksClient.getSigningKey(kid, (err, key) => {
          if (err) {
            done(err, null);
          } else {
            const signingKey = key.getPublicKey();
            done(null, signingKey);
          }
        });
      },
      ignoreExpiration: false, // Don't allow expired tokens
    });
  }

  async validate(payload: jwtPayloadInterface) {
    // You can validate the user based on the JWT payload here
    // For example, you can retrieve the user from the database using the `sub` claim
    return { userId: payload.sub, email: payload.email }; // This payload gets attached to the request object
  }
}
