import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = User;

@Schema()
export class User extends Document {

    @Prop({ required: true, index: true })
    name: string;


    @Prop({ required: true, unique: true, index: true })
    email: string;


    @Prop({ required: true, index: true })
    password: string;


    @Prop({ required: true, index: true, default: true })
    isActive: boolean;

}

export const UsersSchema = SchemaFactory.createForClass(User).set(
    'timestamps',
    true,
);
