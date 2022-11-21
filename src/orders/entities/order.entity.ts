import { Contract } from '../../contracts/entities/contract.entity';
import { Local } from '../../locals/entities/local.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Local)
  @JoinColumn({ name: 'local_id' })
  local: Local;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'additional_contract_id' })
  additionalContract: Contract;

  @Column({
    nullable: false,
  })
  number: number;

  @Column({
    nullable: false,
  })
  status: string;

  @Column({
    name: 'start_restriction',
    type: 'date',
    nullable: true,
  })
  startRestriction: Date;

  @Column({
    name: 'end_restriction',
    type: 'date',
    nullable: true,
  })
  endRestriction: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
