import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateExpenceDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    amount!: number

    @IsString()
    @IsNotEmpty()
    category!:string

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description? : string

    @IsOptional()
    @IsDate()
    date?: Date

}
