import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesSchema, IExpenses } from './entities/expenses.entity';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: IExpenses.name, schema: ExpensesSchema }])
    ],
    controllers: [ExpensesController],
    providers: [ExpensesService],

})
export class ExpensesModule { }
