import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, MaxLength, MaxDate, IsPositive, IsDate } from 'class-validator';

export class CreateExpensesDto {

    @IsString()
    @MaxLength(191)
    description: string;


    @Transform(({ value }) => new Date(value))
    @IsDate()
    @MaxDate(new Date())
    date: string;


    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    value: number;

}

export class UpdateExpensesDto extends PartialType(CreateExpensesDto) { }
