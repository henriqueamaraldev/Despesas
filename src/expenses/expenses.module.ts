import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesSchema, Expenses } from './entities/expenses.entity';
import { MailModule } from 'src/mailer/mail.module';
import { ExpensesDatabase } from 'src/database/expenses.database';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: Expenses.name, schema: ExpensesSchema }]),
        MailModule
    ],
    controllers: [ExpensesController],
    providers: [ExpensesService, ExpensesDatabase],

})
export class ExpensesModule { }
