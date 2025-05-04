import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserUseCase } from '../application/use-cases/validate-user.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: any, email: string, password: string): Promise<any> {
    const type = req.body.type; // 'user' ou 'support'
    if (!type) throw new UnauthorizedException('Missing user type');
    const user = await this.validateUserUseCase.execute(type, email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
