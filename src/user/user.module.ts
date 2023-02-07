import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClassesSchema, IUser } from './entities/user.entity';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: IUser.name, schema: ClassesSchema }])
    ],
    controllers: [UserController],
    providers: [UserService],

})
export class UserModule { }
