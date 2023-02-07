import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;


    @IsString()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string[];

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
