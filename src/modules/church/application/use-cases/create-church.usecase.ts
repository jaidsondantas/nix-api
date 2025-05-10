import { ConflictException, Injectable } from '@nestjs/common';
import { CreateChurchDto } from '../dto/create-church.dto';
import { Church } from '../../domain/entities/church.entity';
import { Address } from '../../domain/value-objects/address.vo';
import { ChurchRepository } from '../../infra/database/mongoose/repositories/church.repository';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';
import { ChurchType } from '../../../../shared/enums/church-type.enum';

@Injectable()
export class CreateChurchUseCase {
  constructor(private readonly churchRepo: ChurchRepository) {}

  async execute(dto: CreateChurchDto): Promise<Church> {
    const exists = await this.churchRepo.findByNameAndTenant(
      dto.name,
      dto.tenantId,
    );
    if (exists)
      throw new ConflictException({
        error: 'Church name already exists for this tenant',
      });

    const address = new Address(
      dto.address.street,
      dto.address.number,
      dto.address.district,
      dto.address.city,
      dto.address.state,
      dto.address.zipCode,
      dto.address.complement,
    );

    const church: Church = {
      ...dto,
      address,
      status: dto.status || ChurchStatus.ACTIVE,
      type: dto.type || ChurchType.MAIN,
      createdAt: new Date(),
    } as Church;

    return this.churchRepo.create(church);
  }
}
