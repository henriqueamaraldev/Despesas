import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateExpensesDto {

    @IsString()
    description: string;


    @IsDate()
    date: string;


    @IsNumber()
    @IsNotEmpty()
    value: string;

}

export class UpdateExpensesDto extends PartialType(CreateExpensesDto) { }
