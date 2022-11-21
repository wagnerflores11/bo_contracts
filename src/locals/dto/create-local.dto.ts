import { Account } from '../../accounts/entities/account.entity';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateLocalDto {
  account: Account;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ltcAccount?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ltfAccount?: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(50)
  nif: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  zipcode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  emailPlanning?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  sirapaid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  area?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  mainSiteCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  siteCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  searchName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  contactName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  contactCargo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  contactPhone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  blocked: boolean;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
