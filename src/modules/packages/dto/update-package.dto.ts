import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsDateString,
  IsArray,
} from 'class-validator';

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsArray()
  features?: string[];

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}


export class UpdatePackageMediaDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  gallery?: string[];
}