import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExpensesDocument, Expenses } from './entities/expenses.entity';
import { CreateExpensesDto, UpdateExpensesDto } from './dto/create-expenses.dto';

@Injectable()
export class ExpensesService {


    constructor(
        @InjectModel(Expenses.name) private expensesModel: Model<ExpensesDocument>
    ) { }


    async list(userId: string) {

        try {

            let userExpenses = await this.expensesModel.find({ userId, isActive: true });
            return userExpenses;

        } catch (error) {

            console.log("Error trying to find user's expenses", error);

        }
    }

    async getById(id: string) {

        try {

            let expense = await this.expensesModel.findById(id);

            if (!expense) {

                return;

            }

            return expense;

        } catch (error) {

            console.log("Error trying to find expense", error);

        }
    }


    async create(data: CreateExpensesDto, userId: string) {

        try {

            let newExpense = await this.expensesModel.create({ ...data, userId: userId });

            return newExpense;

        } catch (error) {

            console.log("Error trying to create expense", error);

        }
    }


    async delete(expenseId: string, userId: string) {

        try {

            let expense = await this.expensesModel.findById(expenseId);

            if (!expense) {

                return;

            }

            let deletedExpense = await this.expensesModel.findOneAndUpdate(
                { _id: expense._id, userId: userId },
                { isActive: false }
            );

            return deletedExpense;

        } catch (error) {

            console.log("Error trying to delete expense", error);

        }
    }


    async update(expenseId: string, userId: string, data: UpdateExpensesDto) {

        try {

            let expense = await this.expensesModel.findById(expenseId);

            if (!expense) {

                return;

            }

            let updatedExpense = await this.expensesModel.findOneAndUpdate(
                { _id: expense._id, userId: userId },
                data
            );

            return updatedExpense;

        } catch (error) {

            console.log("Error trying to update expense", error);

        }

    }
}
