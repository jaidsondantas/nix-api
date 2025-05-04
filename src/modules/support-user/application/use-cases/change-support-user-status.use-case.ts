import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class ChangeSupportUserStatusUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute(id: string, status: 'active' | 'inactive') {
    if (!['active', 'inactive'].includes(status)) {
      throw new BadRequestException({ message: 'Invalid status value' });
    }
    const updated = await this.repo.update(id, { status });
    if (!updated)
      throw new NotFoundException({ message: 'SupportUser not found' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = updated;
    return result;
  }
}
