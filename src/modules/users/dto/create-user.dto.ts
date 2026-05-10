import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Max, MaxLength } from "class-validator";
import { user_role } from "src/shared/enums";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name! : string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email! : string

    @IsEnum(user_role)
    role! : user_role

    @IsNotEmpty()
    @IsArray()
    permissions! : string[]

    @IsStrongPassword({
        minLength : 6,
        minNumbers : 1
    })
    password! : string
}
