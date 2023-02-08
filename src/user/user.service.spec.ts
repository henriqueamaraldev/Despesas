import { Test, TestingModule } from '@nestjs/testing';
import { UserDatabase } from './database/user.database';
import { UserService } from './user.service';

describe('UserService', () => {

    let userService: UserService

    let mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserDatabase,
                    useValue: mockRepository
                },
            ]
        }).compile();

        userService = module.get<UserService>(UserService);

    });

    describe("list", () => {
        it('should return a list of users', async () => {

            const users = [
                {
                    name: '',
                    email: '',
                    password: '',
                    isActive: true
                },
                {
                    name: '',
                    email: '',
                    password: '',
                    isActive: true
                }
            ]

            mockRepository.find.mockReturnValue(users);

            let result = await userService.list()

            expect(result).toEqual(users);
        });
    });

})