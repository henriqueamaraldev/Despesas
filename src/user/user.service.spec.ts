import { Test, TestingModule } from '@nestjs/testing'
import { Model } from 'mongoose';
import { UserDatabase } from './database/user.database';
import { User } from './entities/user.entity';
import { UserService } from './user.service'

describe('UserService', () => {

    let userService: UserService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserDatabase,
                {
                    provide: UserDatabase,
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                    }
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    })
})