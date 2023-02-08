import { Body, Controller, Get, HttpStatus, Post, Res, Req, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Response } from 'express';
import { CreateExpensesDto, UpdateExpensesDto } from './dto/create-expenses.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('expenses')
export class ExpensesController {


    constructor(
        private readonly expensesService: ExpensesService
    ) { }


    @Post()
    @UseGuards(JwtAuthGuard)
    async createExpense(
        @Body() payload: CreateExpensesDto,
        @Res() res: Response,
        @Req() req
    ) {

        const userId = req.user.id;

        let userEmail = req.user.email;

        const newExpense = await this.expensesService.create(payload, userId, userEmail);

        res.status(HttpStatus.OK).send(newExpense)

    }


    @Get()
    @UseGuards(JwtAuthGuard)

    async getExpenses(
        @Res() res: Response,
        @Req() req
    ) {

        let userId = req.user.id;

        let users = await this.expensesService.list(userId);

        if (users.length == 0) {

            res.status(HttpStatus.NO_CONTENT).send("Não foram encontrados usuários")

        }

        res.status(HttpStatus.OK).send(users)

    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getExpenseById(
        @Param('id') expenseId: string,
        @Res() res: Response,
        @Req() req
    ) {

        const userId = req.user.id;

        const expense = await this.expensesService.getById(expenseId, userId);

        if (!expense) {

            res.status(HttpStatus.NO_CONTENT).send("Despesa não encontrada.")

        }

        res.status(HttpStatus.OK).send(expense)

    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateExpense(
        @Body() payload: UpdateExpensesDto,
        @Param('id') expenseId: string,
        @Res() res: Response,
        @Req() req,
    ) {

        const userId = req.user.id;

        const expense = await this.expensesService.update(expenseId, userId, payload);

        if (!expense) {

            res.status(HttpStatus.NO_CONTENT).send("Não foi possível encontrar uma despesa com este id.")

        }

        res.status(HttpStatus.OK).send(expense)

    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteExpense(
        @Res() res: Response,
        @Param('id') expenseId: string,
        @Req() req,
    ) {

        const userId = req.user.id;

        const expense = await this.expensesService.delete(expenseId, userId);

        if (!expense) {

            res.status(HttpStatus.NO_CONTENT).send("Não foi possível encontrar uma despesa com este id.")

        }

        res.status(HttpStatus.OK).send(expense)

    }


}
