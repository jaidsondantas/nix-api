import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../core/constants/jwt.const';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: any) {
    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expiresIn,
      }),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
