import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {


    constructor(
        private readonly usersService: UserService
    ) { }


    @Post()
    createUser(
        @Body() payload: CreateUserDto
    ) {

        return this.usersService.create(payload);

    }


    @Get()
    async getUsers() {

        return this.usersService.list();

    }

}
