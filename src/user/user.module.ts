import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersSchema, User } from './entities/user.entity';
import { UserDatabase } from './database/user.database';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }])
    ],
    controllers: [UserController],
    providers: [UserService, UserDatabase],
    exports: [UserService],
})


export class UserModule { }
