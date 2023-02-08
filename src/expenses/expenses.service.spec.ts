import { Test, TestingModule } from '@nestjs/testing'
import { MailService } from '../mailer/mail.service';
import { ExpensesDatabase } from './database/expenses.database';
import { CreateExpensesDto } from './dto/create-expenses.dto';
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


        it('should return an empty array list', async () => {

            const expenses = []

            mockRepository.find.mockReturnValue(expenses);

            let result = await expensesService.list('')

            expect(result).toEqual([]);
        });


        it('should return a expense with same id', async () => {

            const expense = {
                _id: '1234',
                description: '',
                date: new Date(),
                userId: '1234',
                value: 250,
                isActive: true
            }

            mockRepository.findOne.mockReturnValue(expense);

            let result = await expensesService.getById('1234', '1234')

            expect(result).toEqual(expense);
        });


        it('should return a created expense', async () => {

            const expense = {
                _id: '1234',
                description: '',
                date: new Date(),
                userId: '1234',
                value: 250,
                isActive: true
            }

            const request: CreateExpensesDto = {
                description: 'Description',
                date: '01-01-2022',
                value: 250
            }

            mockRepository.create.mockReturnValue(expense);

            let result = await expensesService.create(request, '1234', '1234')

            expect(result).toEqual(expense);
        });

    });
})