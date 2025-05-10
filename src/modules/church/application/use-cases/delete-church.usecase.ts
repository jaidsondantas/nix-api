import { Injectable, NotFoundException } from '@nestjs/common';
import { ChurchRepository } from '../../infra/database/mongoose/repositories/church.repository';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';

@Injectable()
export class DeleteChurchUseCase {
  constructor(private readonly churchRepo: ChurchRepository) {}

  async execute(id: string): Promise<void> {
    const church = await this.churchRepo.findById(id);
    if (!church) throw new NotFoundException('Church not found');
    await this.churchRepo.update(id, { status: ChurchStatus.INACTIVE });
  }
}
