import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UpdateChurchDto } from '../dto/update-church.dto';
import { Church } from '../../domain/entities/church.entity';
import { Address } from '../../domain/value-objects/address.vo';
import { ChurchRepository } from '../../infra/database/mongoose/repositories/church.repository';

@Injectable()
export class UpdateChurchUseCase {
  constructor(private readonly churchRepo: ChurchRepository) {}

  async execute(id: string, dto: UpdateChurchDto): Promise<Church> {
    const existing = await this.churchRepo.findById(id);
    if (!existing) throw new NotFoundException('Church not found');

    // Se o nome mudou, verifica unicidade por tenant
    if (dto.name && dto.name !== existing.name) {
      const conflict = await this.churchRepo.findByNameAndTenant(
        dto.name,
        dto.tenantId || existing.tenantId,
      );
      if (conflict && conflict._id.toString() !== id) {
        throw new ConflictException({
          error: 'Church name already exists for this tenant',
        });
      }
    }

    let address = existing.address;
    if (dto.address) {
      address = new Address(
        dto.address.street ?? address.street,
        dto.address.number ?? address.number,
        dto.address.district ?? address.district,
        dto.address.city ?? address.city,
        dto.address.state ?? address.state,
        dto.address.zipCode ?? address.zipCode,
        dto.address.complement ?? address.complement,
      );
    }

    const updatedChurch: Partial<Church> = {
      ...dto,
      address,
    };

    return this.churchRepo.update(id, updatedChurch);
  }
}
