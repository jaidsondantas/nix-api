import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DepartmentDocument,
  DepartmentSchema,
} from './infra/database/mongoose/schemas/department.schema';
import { DepartmentController } from './presentation/controllers/department.controller';
import { DepartmentRepository } from './infra/database/mongoose/repositories/department.repository';

// Importação dos use-cases
import { CreateDepartmentUseCase } from './application/use-cases/create-department.use-case';
import { UpdateDepartmentUseCase } from './application/use-cases/update-department.use-case';
import { FindDepartmentByIdUseCase } from './application/use-cases/find-department-by-id.use-case';
import { SoftDeleteDepartmentUseCase } from './application/use-cases/soft-delete-department.use-case';
import { ListDepartmentsUseCase } from './application/use-cases/list-department.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Department', schema: DepartmentSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [
    DepartmentRepository,
    CreateDepartmentUseCase,
    UpdateDepartmentUseCase,
    ListDepartmentsUseCase,
    FindDepartmentByIdUseCase,
    SoftDeleteDepartmentUseCase,
  ],
  exports: [
    CreateDepartmentUseCase,
    UpdateDepartmentUseCase,
    ListDepartmentsUseCase,
    FindDepartmentByIdUseCase,
    SoftDeleteDepartmentUseCase,
  ],
})
export class DepartmentModule {}
