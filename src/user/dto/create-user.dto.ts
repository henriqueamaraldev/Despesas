import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
