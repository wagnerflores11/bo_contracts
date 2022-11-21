import { Account } from '../../accounts/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ViewColumn,
  ViewEntity,
} from 'typeorm';

@Entity({
  name: 'locals',
})
export class Local {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Account, (account) => account.locals)
  account: Account;

  @Column({
    nullable: true,
    name: 'ltc_account',
    length: 50,
  })
  ltcAccount: string;

  @Column({
    nullable: true,
    name: 'ltf_account',
    length: 50,
  })
  ltfAccount: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    nullable: true,
    length: 255,
  })
  email: string;

  @Column({
    length: 50,
  })
  nif: string;

  @Column({
    nullable: true,
    length: 255,
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
    nullable: true,
    length: 50,
  })
  country: string;

  @Column({
    nullable: true,
    length: 50,
  })
  phone: string;

  @Column({
    nullable: true,
    length: 255,
    name: 'email_planning',
  })
  emailPlanning: string;

  @Column({
    nullable: true,
    length: 50,
  })
  sirapaid: string;

  @Column({
    nullable: true,
    length: 255,
  })
  area: string;

  @Column({
    nullable: true,
    length: 25,
    name: 'main_site_code',
  })
  mainSiteCode: string;

  @Column({
    nullable: true,
    length: 25,
    name: 'site_code',
  })
  siteCode: string;

  @Column({
    nullable: true,
    length: 255,
    name: 'search_name',
  })
  searchName: string;

  @Column({
    nullable: true,
    length: 55,
    name: 'contact_name',
  })
  contactName: string;

  @Column({
    nullable: true,
    length: 55,
    name: 'contact_cargo',
  })
  contactCargo: string;

  @Column({
    nullable: true,
    length: 55,
    name: 'contact_phone',
  })
  contactPhone: string;

  @Column({
    default: false,
  })
  blocked: boolean;

  @Column({
    default: false,
  })
  active: boolean;

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
