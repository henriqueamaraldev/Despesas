import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = IUser & Document;

@Schema()
export class IUser {

    @Prop({ required: true, index: true })
    name: string;


    @Prop({ required: true, unique: true, index: true })
    email: string;


    @Prop({ required: true, index: true })
    password: string;


    @Prop({ required: true, index: true, default: true })
    isActive: boolean;

}

export const UsersSchema = SchemaFactory.createForClass(IUser).set(
    'timestamps',
    true,
);
