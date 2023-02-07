import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpensesDocument = IExpenses & Document;

@Schema()
export class IExpenses {

    @Prop({ required: false, index: false })
    description: string;


    @Prop({ required: false, index: false })
    date: Date;


    @Prop({ required: true, ref: 'User', index: true })
    userId: string;


    @Prop({ required: true, index: false })
    value: number;

    @Prop({ required: true, index: true, default: true })
    isActive: boolean;

}

export const ExpensesSchema = SchemaFactory.createForClass(IExpenses).set(
    'timestamps',
    true,
);
