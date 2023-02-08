import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {


    constructor(
        private readonly usersService: UserService
    ) { }


    @Post()
    async createUser(
        @Body() payload: CreateUserDto,
        @Res() res: Response
    ) {

        const newUser = await this.usersService.create(payload);

        if (!newUser) {

            res.status(HttpStatus.BAD_REQUEST).send("Email already in use.")

        }

        res.status(HttpStatus.OK).send(newUser)

    }

    @Get()
    async getUsers(
        @Res() res: Response
    ) {

        const users = await this.usersService.list();

        if (users.length == 0) {

            res.status(HttpStatus.NO_CONTENT).send("Não foram encontrados usuários")

        }

        res.status(HttpStatus.OK).send(users)

    }

}
