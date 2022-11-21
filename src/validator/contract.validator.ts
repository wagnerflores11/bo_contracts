import { Validate } from 'class-validator';
import { Contract } from '../contracts/entities/contract.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'contractValidate', async: true })
@Injectable()
export class ContractValidate implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Contract)
    private repository: Repository<Contract>,
  ) {}

  async validate(value: any): Promise<boolean> {
    return !!(await this.repository.findOneBy({ id: value }));
  }

  defaultMessage(): string {
    return 'Operação não localizada';
  }
}
