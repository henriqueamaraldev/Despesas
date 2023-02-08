import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserDatabase {


    constructor(
        @InjectModel(User.name) private usersModel: Model<User>
    ) { }


    async find() {

        return this.usersModel.find();

    }

    async exists(filters: Object) {

        return this.usersModel.exists(filters);

    }


    async create(data: CreateUserDto) {

        let user = await this.usersModel.create(data);

        return user;

    }


    async findOne(filters: Object) {

        const user = await this.usersModel.findOne(filters);

        return user;

    }

}