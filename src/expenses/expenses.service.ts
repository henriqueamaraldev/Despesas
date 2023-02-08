import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Expenses } from './entities/expenses.entity';
import { CreateExpensesDto, UpdateExpensesDto } from './dto/create-expenses.dto';

@Injectable()
export class ExpensesService {


    constructor(
        @InjectModel(Expenses.name) private expensesModel: Model<Expenses>
    ) { }


    async list(userId: string) {

        try {

            let userExpenses = await this.expensesModel.find({ userId, isActive: true });
            return userExpenses;

        } catch (error) {

            console.log("Error trying to find user's expenses", error);

        }
    }

    async getById(id: string, userId: string) {

        try {

            let expense = await this.expensesModel.findOne({ _id: id, userId: userId, isActive: true });

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

            let expense = await this.expensesModel.findOne({ _id: expenseId, userId: userId, isActive: true });

            if (!expense) {

                return;

            }

            let deletedExpense = await this.expensesModel.findOneAndUpdate(
                { _id: expense._id, userId: userId },
                { isActive: false, deletedDate: new Date() }
            );

            return deletedExpense;

        } catch (error) {

            console.log("Error trying to delete expense", error);

        }
    }


    async update(expenseId: string, userId: string, data: UpdateExpensesDto) {

        try {

            let expense = await this.expensesModel.findOne({ _id: expenseId, userId: userId, isActive: true });

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
