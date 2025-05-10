import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RecoverPasswordDto } from '../dto/recover-password.dto';
import { RecoverPasswordUseCase } from '../../application/use-cases/recover-password.use-case';
import { VerifyRecoveryCodeDto } from '../dto/verify-recovery-code.dto';
import { VerifyRecoveryCodeUseCase } from '../../application/use-cases/verify-recovery-code.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly recoverPasswordUseCase: RecoverPasswordUseCase,
    private readonly verifyRecoveryCodeUseCase: VerifyRecoveryCodeUseCase,
  ) {}

  @Post('user/login')
  @UseGuards(AuthGuard('local'))
  async userLogin(@Request() req) {
    return this.loginUseCase.execute({ ...req.user });
  }

  @Post('support-user/login')
  @UseGuards(AuthGuard('local'))
  async supportUserLogin(@Request() req) {
    return this.loginUseCase.execute(req.user);
  }

  @Post('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    await this.recoverPasswordUseCase.execute(recoverPasswordDto);
    return { statusCode: HttpStatus.OK, message: 'Recovery email sent' };
  }

  @Post('verify-recovery-code')
  async verifyRecoveryCode(
    @Body() verifyRecoveryCodeDto: VerifyRecoveryCodeDto,
  ) {
    return this.verifyRecoveryCodeUseCase.execute(verifyRecoveryCodeDto);
  }
}
