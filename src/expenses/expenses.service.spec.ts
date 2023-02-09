import { Test, TestingModule } from '@nestjs/testing'
import { MailService } from '../mailer/mail.service';
import { ExpensesDatabase } from './database/expenses.database';
import { CreateExpensesDto, UpdateExpensesDto } from './dto/create-expenses.dto';
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


        it('should return a updated expense', async () => {

            const expense = {
                _id: '1234',
                description: '',
                date: new Date(),
                userId: '1234',
                value: 250,
                isActive: true
            }

            const request: UpdateExpensesDto = {
                description: 'Description'
            };

            mockRepository.findOne.mockReturnValue(expense);

            const updatedExpense = {
                ...expense
            };

            updatedExpense.description = 'Description';

            mockRepository.findOneAndUpdate.mockReturnValue(updatedExpense);

            let result = await expensesService.update('1234', '1234', request)

            expect(result.description).toEqual(request.description);

        });


        it('should return undefined when try to update an expense that doesnt exists', async () => {

            const expense = undefined;

            const request: UpdateExpensesDto = {
                description: 'Description'
            };

            mockRepository.findOne.mockReturnValue(expense);

            const updatedExpense = {
                ...expense
            };

            updatedExpense.description = 'Description';

            mockRepository.findOneAndUpdate.mockReturnValue(updatedExpense);

            let result = await expensesService.update('12345', '1234', request)

            expect(result).toBeUndefined();

        });


        it('should return deleted expense', async () => {

            const expense = {
                _id: '1234',
                description: '',
                date: new Date(),
                userId: '1234',
                value: 250,
                isActive: true
            };

            mockRepository.findOne.mockReturnValue(expense);

            const updatedExpense = {
                ...expense
            };

            updatedExpense.isActive = false;

            mockRepository.findOneAndUpdate.mockReturnValue(updatedExpense);

            let result = await expensesService.delete('12345', '1234')

            expect(result).toEqual(updatedExpense);

        });


        it('should return null when try to delete an expense that is already deleted', async () => {

            const expense = {
                _id: '1234',
                description: '',
                date: new Date(),
                userId: '1234',
                value: 250,
                isActive: false
            };

            mockRepository.findOne.mockReturnValue(expense);


            let result = await expensesService.delete('1234', '1234')

            expect(result).toBeUndefined();

        });

    });
})