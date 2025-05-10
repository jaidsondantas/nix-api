import { Address } from '../value-objects/address.vo';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';
import { ChurchType } from '../../../../shared/enums/church-type.enum';

export class Church {
  constructor(
    public readonly _id: string,
    public readonly tenantId: string,
    public name: string,
    public address: Address,
    public contact: string,
    public localManager: string,
    public logoUrl?: string,
    public status: ChurchStatus = ChurchStatus.ACTIVE,
    public type?: ChurchType,
    public readonly createdAt?: Date,
  ) {}
}
