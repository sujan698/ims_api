import { IsNotEmpty, IsString,IsEnum,IsOptional, MaxLength } from "class-validator";
import { OrganizationType } from "@prisma/client";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @IsString()
    name :string;

    @IsNotEmpty()
    @IsEnum(OrganizationType)
    type:OrganizationType;

    @IsOptional()
    @IsString()
    address : string;

    @IsOptional()
    @IsString()
    @MaxLength(15)
    phone :string
}
