import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChurchSchema } from './infra/database/mongoose/schemas/church.schema';
import { ChurchRepository } from './infra/database/mongoose/repositories/church.repository';
import { CreateChurchUseCase } from './application/use-cases/create-church.usecase';
import { UpdateChurchUseCase } from './application/use-cases/update-church.usecase';
import { DeleteChurchUseCase } from './application/use-cases/delete-church.usecase';
import { ChangeChurchStatusUseCase } from './application/use-cases/change-church-status.usecase';
import { ListChurchesUseCase } from './application/use-cases/list-churches.usecase';
import { ChurchController } from './presentation/controllers/chuch.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Church', schema: ChurchSchema }]),
  ],
  controllers: [ChurchController],
  providers: [
    ChurchRepository,
    CreateChurchUseCase,
    UpdateChurchUseCase,
    DeleteChurchUseCase,
    ChangeChurchStatusUseCase,
    ListChurchesUseCase,
  ],
  exports: [ChurchRepository],
})
export class ChurchModule {}
