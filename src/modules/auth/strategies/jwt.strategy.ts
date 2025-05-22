import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'NIX2025_SECRET_KEY',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      role: payload.role,
      tenantId: payload.tenantId,
      memberId: payload?.memberId,
    };
  }
}
