import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupportUserRepository } from '../../../support-user/infra/database/mongoose/repositories/support-user-repository';
import { UserRepository } from '../../../user/infra/database/mongoose/repositories/user.repository';
import { SendTextMessageUseCase } from '../../../messaging/application/use-cases/send-text-message.use-case';
import { ERROR_MESSAGES } from '../../../../shared/constants/error_messages';
import { VerifyRecoveryCodeDto } from '../../presentation/dto/verify-recovery-code.dto';
import { CacheService } from '../../../../shared/services/cache.service';

@Injectable()
export class VerifyRecoveryCodeUseCase {
  constructor(
    private readonly supportUserRepo: SupportUserRepository,
    private readonly userRepo: UserRepository,
    private readonly sendTextMessageUseCase: SendTextMessageUseCase,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    verifyRecoveryCodeDto: VerifyRecoveryCodeDto,
  ): Promise<{ valid: boolean }> {
    let user: any = await this.supportUserRepo.findByEmail(
      verifyRecoveryCodeDto.email,
    );
    if (!user) {
      user = await this.userRepo.findByEmail(verifyRecoveryCodeDto.email);
      if (user) {
        user.created_at = null;
      }
    }
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const cachedCode = await this.cacheService.get(
      `recover-code:${user.email}`,
    );
    if (!cachedCode || cachedCode !== verifyRecoveryCodeDto.recoveryCode) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_RECOVERY_CODE);
    }

    return { valid: true };
  }
}
