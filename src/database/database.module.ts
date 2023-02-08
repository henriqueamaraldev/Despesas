import { Module } from '@nestjs/common';
import { Paginate, PaginationOptions } from './Paginate.service';

@Module({

    imports: [],
    providers: [Paginate, PaginationOptions],
    exports: [Paginate, PaginationOptions]

})
export class DatabaseModule { }
