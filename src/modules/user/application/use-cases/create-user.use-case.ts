import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import { Member } from '../../domain/entities/member.entity'; // Ajuste o caminho conforme seu projeto
// import { Tenant } from '../../domain/entities/tenant.entity'; // Ajuste o caminho conforme seu projeto
// import { Church } from '../../domain/entities/church.entity'; // Ajuste o caminho conforme seu projeto

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    // @InjectModel('Tenant') private readonly tenantModel: Model<Tenant>,
    // @InjectModel('Church') private readonly churchModel: Model<Church>,
    // @InjectModel('Member') private readonly memberModel: Model<Member>,
  ) {}

  async execute(dto: CreateUserDto) {
    if (await this.userRepo.findByEmail(dto.email)) {
      throw new BadRequestException('Email already exists');
    }

    // --- Validação de existência ---
    // // Tenant
    // const tenantExists = await this.tenantModel.exists({ _id: dto.tenantId });
    // if (!tenantExists) throw new NotFoundException('Tenant not found');
    //
    // // Church (se informado)
    // if (dto.churchId) {
    //   const churchExists = await this.churchModel.exists({ _id: dto.churchId });
    //   if (!churchExists) throw new NotFoundException('Church not found');
    // }
    //
    // // Member (se informado)
    // if (dto.memberId) {
    //   const memberExists = await this.memberModel.exists({ _id: dto.memberId });
    //   if (!memberExists) throw new NotFoundException('Member not found');
    // }
    // --- Fim da validação ---

    if (dto.role === 'admin') {
      const admins = await this.userRepo.find({
        tenantId: dto.tenantId,
        role: 'admin',
      });
      if (admins.length > 0) {
        throw new BadRequestException('Only one admin allowed per tenant');
      }
    }

    // Hash da senha
    const pass = await bcrypt.hash(dto.passwordHash, 10);

    // Convert string IDs to ObjectId
    const data: any = {
      ...dto,
      passwordHash: pass, // salva o hash
      tenantId: new Types.ObjectId(dto.tenantId),
    };
    delete data.password;
    if (dto.churchId) data.churchId = new Types.ObjectId(dto.churchId);
    if (dto.memberId) data.memberId = new Types.ObjectId(dto.memberId);

    const user = await this.userRepo.create(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user.toObject();
    return result;
  }
}
