import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/entities/user.entity';
import { UserRepository } from './infra/database/mongoose/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { SoftDeleteUserUseCase } from './application/use-cases/soft-delete-user.use-case';
import { PatchUserStatusUseCase } from './application/use-cases/patch-user-status.use-case';
import { PatchUserMemberUseCase } from './application/use-cases/patch-user-member.use-case';
import { UserController } from './presentation/controllers/user.controller';
import { RolesGuard } from '../auth/presentation/guards/roles.guard';
import { JwtAuthGuard } from '../auth/presentation/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    SoftDeleteUserUseCase,
    PatchUserStatusUseCase,
    PatchUserMemberUseCase,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    UserRepository,
    MongooseModule],
})
export class UserModule {}
