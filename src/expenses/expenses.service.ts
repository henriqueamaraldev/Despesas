import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExpensesDocument, IExpenses } from './entities/expenses.entity';
import { CreateExpensesDto } from './dto/create-expenses.dto';

@Injectable()
export class ExpensesService {


    constructor(
        @InjectModel(IExpenses.name) private expensesModel: Model<ExpensesDocument>
    ) { }

}
