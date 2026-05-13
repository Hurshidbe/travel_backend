import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
} from 'class-validator';
import { user_role } from 'src/shared/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsEnum(user_role)
  @IsOptional()
  role?: user_role;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  permissions?: string[];

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
  })
  password!: string;
}
