import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './presentation/controllers/auth.controller';

import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { RolesGuard } from './presentation/guards/roles.guard';

import { SupportUserModule } from '../support-user/support-user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SupportUserRepository } from '../support-user/infra/database/mongoose/repositories/support-user-repository';
import { jwtConstants } from './core/constants/jwt.const';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { CacheService } from '../../shared/services/cache.service';
import { RecoverPasswordUseCase } from './application/use-cases/recover-password.use-case';
import { MessagingModule } from '../messaging/messaging.module';
import { VerifyRecoveryCodeUseCase } from './application/use-cases/verify-recovery-code.use-case';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    // UserModule,
    SupportUserModule,
    MessagingModule,
  ],
  controllers: [AuthController],
  providers: [
    SupportUserRepository,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    JwtService,
    LoginUseCase,
    ValidateUserUseCase,
    CacheService,
    RecoverPasswordUseCase,
    VerifyRecoveryCodeUseCase,
  ],
  exports: [LoginUseCase, ValidateUserUseCase, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
