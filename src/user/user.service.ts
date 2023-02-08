import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDatabase } from './database/user.database';


@Injectable()
export class UserService {


  constructor(
    private usersModel: UserDatabase
  ) { }


  async list() {

    try {

      const users = await this.usersModel.find();

      return users;

    } catch (error) {

      console.log("Error while trying to list users: ", error);

    }

  }


  async create(data: CreateUserDto) {

    try {

      let userExists = await this.usersModel.exists({ email: data.email });

      if (!userExists) {

        let password = await bcrypt.hash(data.password, 10);

        data.password = password;

        let user = await this.usersModel.create(data);

        return user;

      }

      return;

    } catch (error) {

      console.log("Error while trying to create a new user: ", error);

    }

  }

  async findByEmail(email: string) {

    const user = await this.usersModel.findOne({ email: email });

    return user;
  }

}
