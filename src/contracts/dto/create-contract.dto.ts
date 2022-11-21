import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateContractDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  contract: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  line: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  subcontract: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  type: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  typeOption: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  unitCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  qty: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  postingType: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  postingAccount: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  postingLTAccount: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  businessType: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  businessAccount: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  businessLTAccount: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  salesperson: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  orderCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  qualityCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  deliveryCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  ourRef: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  yourRef: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  externalDoc: string;
}
