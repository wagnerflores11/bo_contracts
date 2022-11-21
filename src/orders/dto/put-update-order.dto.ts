// import {
//   IsNotEmpty,
//   IsString,
//   IsNumberString,
//   MaxLength,
// } from 'class-validator';

import { Contract } from '../../contracts/entities/contract.entity';
import { Local } from '../../locals/entities/local.entity';

export class PutUpdateOrderDto {
  local: Local;

  contract: Contract;

  additionalContract: Contract;

  startRestriction: Date;

  endRestriction: Date;
}
