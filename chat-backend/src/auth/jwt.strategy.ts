import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

interface jwtPayload {
  email: string;
  sub: string;
}

interface jwtResponse {
  userId: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromHeader('access_token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: jwtPayload): Promise<jwtResponse> {
    // If you want to add more info to req.user object, you can do it here (e.g. access DB).
    return { userId: payload.sub, email: payload.email };
  }
}
