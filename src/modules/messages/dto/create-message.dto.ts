import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name! : string    
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    contact! : string

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    message! : string
}
