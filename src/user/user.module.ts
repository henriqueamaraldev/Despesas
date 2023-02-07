import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersSchema, IUser } from './entities/user.entity';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: IUser.name, schema: UsersSchema }])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})


export class UserModule { }
