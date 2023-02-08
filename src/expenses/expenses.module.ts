import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesSchema, Expenses } from './entities/expenses.entity';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: Expenses.name, schema: ExpensesSchema }])
    ],
    controllers: [ExpensesController],
    providers: [ExpensesService],

})
export class ExpensesModule { }
