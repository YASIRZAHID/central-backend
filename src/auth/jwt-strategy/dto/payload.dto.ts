export interface jwtPayloadInterface {
    sub: string; // The subject (user ID) claim
    email: string;
    iat?: number; // Issued at timestamp
    exp?: number; // Expiration timestamp
  }
  