import { Test, TestingModule } from '@nestjs/testing'
import { MailService } from '../mailer/mail.service';
import { ExpensesDatabase } from './database/expenses.database';
import { ExpensesService } from './expenses.service'

describe('ExpensesService', () => {


    let expensesService: ExpensesService;
    let mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExpensesService,
                {
                    provide: ExpensesDatabase,
                    useValue: mockRepository
                },
                {
                    provide: MailService,
                    useValue: {
                        sendEmail: jest.fn()
                    }
                }
            ]
        }).compile();

        expensesService = module.get<ExpensesService>(ExpensesService);

    });


    describe("list", () => {
        it('should return a list of expenses', async () => {

            const expenses = [
                {
                    description: '',
                    date: new Date(),
                    userId: '',
                    value: 250,
                    isActive: true
                },
                {
                    description: '',
                    date: new Date(),
                    userId: '',
                    value: 250,
                    isActive: true
                }
            ]

            mockRepository.find.mockReturnValue(expenses);

            let result = await expensesService.list('')

            expect(result).toEqual(expenses);
        });
    });
})