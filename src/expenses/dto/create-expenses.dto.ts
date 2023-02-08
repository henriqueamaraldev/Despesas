import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsDate, IsNumber, MaxLength, MaxDate, IsPositive } from 'class-validator';

export class CreateExpensesDto {

    @IsString()
    @MaxLength(191)
    description: string;


    @IsDate()
    @MaxDate(new Date())
    date: string;


    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    value: string;

}

export class UpdateExpensesDto extends PartialType(CreateExpensesDto) { }
