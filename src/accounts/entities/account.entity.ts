import { Local } from '../../locals/entities/local.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'accounts',
})
export class Account {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @OneToMany(() => Local, (local) => local.account)
  locals: Local[];

  @Column({
    nullable: true,
    name: 'customer_account',
  })
  customerAccount: string;

  @Column({
    nullable: true,
    name: 'supplier_account',
  })
  supplierAccount: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column()
  nif: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
    length: 50,
  })
  zipcode: string;

  @Column({
    nullable: true,
    length: 50,
  })
  city: string;

  @Column({
    name: 'is_customer',
    default: false,
  })
  isCustomer: boolean;

  @Column({
    name: 'is_supplier',
    default: false,
  })
  isSupplier: boolean;

  @Column({
    default: false,
  })
  active: boolean;

  @Column({
    name: 'blocked_for_new_orders',
    default: false,
  })
  blockedForNewOrders: boolean;

  @CreateDateColumn({
    name: 'sync_at',
  })
  syncAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
