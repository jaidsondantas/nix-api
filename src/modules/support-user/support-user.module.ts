import { Module } from '@nestjs/common';
import { SupportUserRepository } from './infra/database/mongoose/repositories/support-user-repository';
import { SupportUserController } from './presentation/controllers/support-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportUser } from './domain/entities/support-user.entity';
import { SupportUserSchema } from './infra/database/mongoose/schemas/support-user.schema';
import { CreateSupportUserUseCase } from './application/use-cases/create-support-user.use-case';
import { ListSupportUsersUseCase } from './application/use-cases/list-support-users.use-case';
import { GetSupportUserUseCase } from './application/use-cases/get-support-user.use-case';
import { UpdateSupportUserUseCase } from './application/use-cases/update-support-user.use-case';
import { DeleteSupportUserUseCase } from './application/use-cases/delete-support-user.use-case';
import { ChangeSupportUserStatusUseCase } from './application/use-cases/change-support-user-status.use-case';
import { ChangeSupportUserPasswordUseCase } from './application/use-cases/change-support-user-password.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportUser.name, schema: SupportUserSchema },
    ]),
  ],
  controllers: [SupportUserController],
  providers: [
    SupportUserRepository,
    CreateSupportUserUseCase,
    ListSupportUsersUseCase,
    GetSupportUserUseCase,
    UpdateSupportUserUseCase,
    DeleteSupportUserUseCase,
    ChangeSupportUserStatusUseCase,
    ChangeSupportUserPasswordUseCase,
  ],
  exports: [
    SupportUserRepository,
    CreateSupportUserUseCase,
    ListSupportUsersUseCase,
    GetSupportUserUseCase,
    UpdateSupportUserUseCase,
    DeleteSupportUserUseCase,
    ChangeSupportUserStatusUseCase,
    ChangeSupportUserPasswordUseCase,
    MongooseModule,
  ],
})
export class SupportUserModule {}
