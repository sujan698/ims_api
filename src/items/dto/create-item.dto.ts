import { IsString, IsOptional, IsInt, IsNumber, IsEnum, IsArray } from 'class-validator';
import { DiscountType } from '@prisma/client';

export class CreateItemDto {
  
  itemId:number;
  organizationId:number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsEnum(DiscountType)
  discountType?: DiscountType;

  @IsOptional()
  @IsNumber()
  tax?: number;
}
