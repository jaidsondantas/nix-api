import { Injectable, NotFoundException } from '@nestjs/common';
import { SupportUserRepository } from '../../../support-user/infra/database/mongoose/repositories/support-user-repository';
import { UserRepository } from '../../../user/infra/database/mongoose/repositories/user.repository';
import { SendTextMessageUseCase } from '../../../messaging/application/use-cases/send-text-message.use-case';
import { ERROR_MESSAGES } from '../../../../shared/constants/error_messages';
import { formatPhoneNumberToWhatsapp } from '../../../../shared/utils/phone-number.util';
import { RecoverPasswordDto } from '../../presentation/dto/recover-password.dto';
import { CacheService } from '../../../../shared/services/cache.service';
import { SupportUser } from '../../../support-user/domain/entities/support-user.entity';
import { User } from '../../../user/domain/entities/user.entity';

@Injectable()
export class RecoverPasswordUseCase {
  constructor(
    private readonly sendTextMessageUseCase: SendTextMessageUseCase,
    private readonly supportUserRepo: SupportUserRepository,
    private readonly userRepo: UserRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(recoverPasswordDto: RecoverPasswordDto): Promise<void> {
    let user: any = await this.supportUserRepo.findByEmail(
      recoverPasswordDto.email,
    );
    if (!user) {
      user = await this.userRepo.findByEmail(recoverPasswordDto.email);
      // Adiciona created_at se vier do UserRepository
      if (user) {
        (user as any).created_at = null;
      }
    }
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.cacheService.set(`recover-code:${user.email}`, recoveryCode);

    const message = `Seu código de verificação é: ${recoveryCode}`;
    await this.sendTextMessageUseCase.execute(
      formatPhoneNumberToWhatsapp(user.phone),
      message,
    );
  }
}
