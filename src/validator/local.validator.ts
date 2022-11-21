import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Local } from 'src/locals/entities/local.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'localValidate', async: true })
@Injectable()
export class LocalsValidate implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Local)
    private repository: Repository<Local>,
  ) {}

  async validate(value: any): Promise<boolean> {
    return !!(await this.repository.findOneBy({ id: value }));
  }

  defaultMessage(): string {
    return 'Conta/local não localizados';
  }
}
