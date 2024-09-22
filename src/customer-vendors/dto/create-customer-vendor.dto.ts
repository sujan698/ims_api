import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCustomerVendorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsBoolean()
  @IsOptional()
  isVendor?: boolean = false;
}
