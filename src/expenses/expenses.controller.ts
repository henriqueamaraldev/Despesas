import { Body, Controller, Get, HttpStatus, Post, Res, Req, Patch, Param, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Request, Response } from 'express';
import { CreateExpensesDto, UpdateExpensesDto } from './dto/create-expenses.dto';

@Controller('expenses')
export class ExpensesController {


    constructor(
        private readonly expensesService: ExpensesService
    ) { }


    @Post()
    async createExpense(
        @Body() payload: CreateExpensesDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const newExpense = await this.expensesService.create(payload, '');

        res.status(HttpStatus.OK).send(newExpense)

    }


    @Get()
    async getExpenses(
        @Res() res: Response
    ) {

        let userId = ''

        const users = await this.expensesService.list(userId);

        if (users.length == 0) {

            res.status(HttpStatus.NO_CONTENT).send("Não foram encontrados usuários")

        }

        res.status(HttpStatus.OK).send(users)

    }


    @Get(':id')
    async getExpenseById(
        @Res() res: Response,
        @Param('id') expenseId: string
    ) {

        const expense = await this.expensesService.getById(expenseId);

        if (expense) {

            res.status(HttpStatus.NO_CONTENT).send("Despesa não encontrada.")

        }

        res.status(HttpStatus.OK).send(expense)

    }


    @Patch(':id')
    async updateExpense(
        @Res() res: Response,
        @Body() payload: UpdateExpensesDto,
        @Param('id') expenseId: string
    ) {

        const expense = await this.expensesService.update(expenseId, expenseId, payload);

        if (!expense) {

            res.status(HttpStatus.NO_CONTENT).send("Não foi possível encontrar uma despesa com este id.")

        }

        res.status(HttpStatus.OK).send(expense)

    }


    @Delete(':id')
    async deleteExpense(
        @Res() res: Response,
        @Param('id') expenseId: string
    ) {

        const expense = await this.expensesService.delete(expenseId, expenseId);

        if (!expense) {

            res.status(HttpStatus.NO_CONTENT).send("Não foi possível encontrar uma despesa com este id.")

        }

        res.status(HttpStatus.OK).send(expense)

    }


}
