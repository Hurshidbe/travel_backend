import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

  @IsString()
  @IsNotEmpty()
  destination!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsDateString()
  @IsNotEmpty()
  startDate!: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate!: Date;
}
