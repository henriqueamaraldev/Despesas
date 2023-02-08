import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";


@Injectable()
export class Paginate {


    async aggregate<T>(collection: Model<T, {}, {}, {}, any>, paginateOptions: PaginationOptions, filters?: Object) {

        let totalItems: number = await collection.count(filters)

        let totalPages: number = Math.ceil(totalItems / paginateOptions.limit)

        if (paginateOptions.page > totalPages) {
            paginateOptions.page = totalPages
        }

        const aggregation: any[] = []

        filters ? aggregation.push({
            $match: filters
        }) : ''

        aggregation.push({
            $skip: paginateOptions.limit * (paginateOptions.page - 1)
        })

        aggregation.push({
            $limit: paginateOptions.limit
        })

        paginateOptions.sort ? aggregation.push({
            $sort: {
                ...paginateOptions.sort
            }
        }) : ''

        let data = []

        data.push(await collection.aggregate<T>(aggregation))

        let response = new PaginationResponse<T>(paginateOptions.page, totalPages, data)

        return response
    }

}

export class PaginationOptions {
    page: number;
    limit: number;
    sort?: object;

    constructor(page: number, limit: number, sort?: object) {

        this.page = page

        this.limit = limit

        if (sort) {

            this.sort = sort
        }
    }
}

export class PaginationResponse<T> {
    public data: T[];
    constructor(private page: number, private totalPages: number, data: T[]) {
        this.data = data;
    }
}