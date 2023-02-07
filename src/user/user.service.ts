import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDocument, IUser } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {


  constructor(
    @InjectModel(IUser.name) private expensesModel: Model<UsersDocument>
  ) { }


  async list() {

    const users = await this.expensesModel.find()

    return users;

  }


  async create(data: CreateUserDto) {

    const modelUser = new this.expensesModel(data);

    return await modelUser.save();

  }

}
