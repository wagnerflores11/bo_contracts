import { Validate } from 'class-validator';
import { RelationValidate } from 'src/validator/relation.validator';
import { Order } from 'src/orders/entities/order.entity';

export class CreateRequestDto {
  @Validate(RelationValidate, [Order])
  tableId: Order;

  tableName: string;

  responseId?: number;
}
