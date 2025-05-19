// src/modules/church/application/dto/church-filter.dto.ts
import {
  IsIn,
  IsOptional,
  IsString,
  IsMongoId,
  Max,
  Min,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';
import { ChurchType } from '../../../../shared/enums/church-type.enum';

export class ChurchFilterDto {
  @IsOptional()
  @IsMongoId()
  tenantId?: string; // Só será usado para super_admin/support

  @IsOptional()
  @IsMongoId()
  churchId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(Object.values(ChurchStatus))
  status?: ChurchStatus;

  @IsOptional()
  @IsIn(Object.values(ChurchType))
  type?: ChurchType;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;
}
