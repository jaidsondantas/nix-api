import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ChurchRepository } from '../../infra/database/mongoose/repositories/church.repository';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';

@Injectable()
export class ChangeChurchStatusUseCase {
  constructor(private readonly churchRepo: ChurchRepository) {}

  async execute(id: string, status: ChurchStatus): Promise<void> {
    if (!Object.values(ChurchStatus).includes(status)) {
      throw new BadRequestException('Invalid status');
    }
    const church = await this.churchRepo.findById(id);
    if (!church) throw new NotFoundException('Church not found');
    await this.churchRepo.update(id, { status });
  }
}
