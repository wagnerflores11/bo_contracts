import { Validate } from 'class-validator';
import { Contract } from '../../contracts/entities/contract.entity';
import { Local } from 'src/locals/entities/local.entity';
import { RelationValidate } from 'src/validator/relation.validator';

export class CreateOrderDto {
  @Validate(RelationValidate, [Local], {
    message: 'Conta/local não localizados',
  })
  local: Local;

  @Validate(RelationValidate, [Contract], {
    message: 'Operação não localizada',
  })
  contract: Contract;

  number: number;

  status: string;
}
