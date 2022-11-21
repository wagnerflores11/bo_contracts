import { Order } from '../../orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'request',
})
export class Request {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'table_name',
    nullable: false,
  })
  tableName: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'table_id' })
  tableId: Order;

  @Column({
    name: 'response_id',
    nullable: true,
  })
  responseId: number;
}
