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
  name: 'contracts',
})
export class Contract {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @OneToMany(() => Local, (local) => local.account)
  locals: Local[];

  @Column({
    nullable: true,
  })
  contract: string;

  @Column({
    nullable: true,
  })
  line: string;

  @Column({
    nullable: true,
  })
  subcontract: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column({
    nullable: true,
    name: 'type_option',
  })
  typeOption: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
    name: 'unit_code',
  })
  unitCode: string;

  @Column({
    nullable: true,
  })
  qty: string;

  @Column({
    nullable: true,
    name: 'posting_type',
  })
  postingType: string;

  @Column({
    nullable: true,
    name: 'posting_account',
  })
  postingAccount: string;

  @Column({
    nullable: true,
    name: 'posting_lt_account',
  })
  postingLTAccount: string;

  @Column({
    nullable: true,
    name: 'business_type',
  })
  businessType: string;

  @Column({
    nullable: true,
    name: 'business_account',
  })
  businessAccount: string;

  @Column({
    nullable: true,
    name: 'business_lt_account',
  })
  businessLTAccount: string;

  @Column({
    nullable: true,
  })
  salesperson: string;

  @Column({
    nullable: true,
    name: 'order_code',
  })
  orderCode: string;

  @Column({
    nullable: true,
    name: 'quality_code',
  })
  qualityCode: string;

  @Column({
    nullable: true,
    name: 'delivery_code',
  })
  deliveryCode: string;

  @Column({
    nullable: true,
    name: 'our_ref',
  })
  ourRef: string;

  @Column({
    nullable: true,
    name: 'your_ref',
  })
  yourRef: string;

  @Column({
    nullable: true,
    name: 'external_doc',
  })
  externalDoc: string;

  @Column({
    nullable: true,
    name: 'location_code',
  })
  locationCode: string;

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

  @Column({
    default: '',
    name: 'CIR',
  })
  CIR: string;

  @Column({
    default: '',
    name: 'CIRDsg',
  })
  CIRDsg: string;

  @Column({
    default: '',
    name: 'LER',
  })
  LER: string;

  @Column({
    default: '',
    name: 'CAR',
  })
  CAR: string;

  @Column({
    default: '',
    name: 'disposalFDAccount',
  })
  disposalFDAccount: string;

  @Column({
    default: '',
    name: 'disposalLTFAccount',
  })
  disposalLTFAccount: string;

  @Column({
    default: '',
    name: 'RDProcess',
  })
  RDProcess: string;
}
