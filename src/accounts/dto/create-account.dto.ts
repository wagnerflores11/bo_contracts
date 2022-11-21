import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateAccountDto {
  @IsOptional()
  @IsString()
  customerAccount?: string;

  @IsOptional()
  @IsString()
  supplierAccount?: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(50)
  nif: string;

  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(55)
  @IsEmail()
  phone: string;

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
  @IsBoolean()
  isCustomer?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isSupplier?: boolean = false;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsBoolean()
  blockedForNewOrders: boolean;
}
