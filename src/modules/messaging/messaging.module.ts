import { Module } from '@nestjs/common';
import { SendTextMessageUseCase } from './application/use-cases/send-text-message.use-case';

@Module({
  providers: [SendTextMessageUseCase],
  exports: [SendTextMessageUseCase],
})
export class MessagingModule {}
