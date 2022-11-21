import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import appDataSource from 'src/db/typeOrm.config';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'localValidate', async: true })
@Injectable()
export class RelationValidate implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager(appDataSource)
    private dataSource: DataSource,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    if (args.constraints[0]) {
      return !!(await this.dataSource
        .getRepository(args.constraints[0])
        .findOneBy({ id: value }));
    }
    return false;
  }

  defaultMessage(): string {
    return 'Objeto não localizado';
  }
}
