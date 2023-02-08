import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Expenses } from "src/expenses/entities/expenses.entity";

@Injectable()
export class ExpensesDatabase {


    constructor(
        @InjectModel(Expenses.name) private expensesModel: Model<Expenses>
    ) { }


    async find(filters) {

        return this.expensesModel.find(filters);

    }


    async findOne(filters) {

        return this.expensesModel.findOne(filters);

    }


    async create(data) {

        return await this.expensesModel.create(data);

    }


    async findOneAndUpdate(filters, properties) {

        return await this.expensesModel.findOneAndUpdate(
            filters,
            properties
        );

    }

}