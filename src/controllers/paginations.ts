import {Request} from "express";

// type defaultPaginated = {
//     pageNumber: number,
//     pageSize: number,
//     sortDirection: string,
//     sortBy: string
// }
//
// type userPg = defaultPaginated & {
//     searchLoginTerm: string
// }

// export const pagination = (req: Request): defaultPaginated => {
//
//     const defaultValues = {
//         pageNumber: 1,
//         pageSize: 10,
//         sortDirection: 'desc',
//         sortBy: 'createdAt'
//     }
//
//     const pageNumber = req.query.pageNumber
//     if (pageNumber && !isNaN(parseInt(pageNumber.toString(), 10)) && parseInt(pageNumber.toString(), 10) > 0) {
//         defaultValues.pageNumber = parseInt(pageNumber.toString(), 10)
//     }
//     const pageSize = req.query.pageSize
//     if (pageSize && !isNaN(parseInt(pageSize.toString(), 10)) && parseInt(pageSize.toString(), 10) > 0)
//         defaultValues.pageSize = parseInt(pageSize.toString(), 10)
//
//     const sortDirection = req.query.sortDirection
//     if (sortDirection && req.query.sortDirection === 'asc' ? 'asc' : 'desc')
//         defaultValues.sortDirection.toString()
//
//     const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
//     if (sortBy && req.query.sortBy === 'createdAt')
//         defaultValues.sortBy.toString()
//
//     return defaultValues
// }

// const getUsersPag = (query: any): userPg => {
//     const defaultV: userPg = {
//         ...pagination(query),
//         searchLoginTerm: ''
//     }
//     if (query.searchLoginTerm) {
//
//     }
//     return defaultV
// }


interface PaginatedExample {
    pageNumber: number,
    pageSize: number,
    sortDirection: string,
    sortBy: string
}

class Paginated {
    public pageNumber: number
    public pageSize: number
    public sortDirection: string
    public sortBy: string

    constructor(dto: PaginatedExample) {
        this.pageNumber = dto.pageNumber,
            this.pageSize = dto.pageSize,
            this.sortDirection = dto.sortDirection,
            this.sortBy = dto.sortBy

    }

}
const defaultValues: PaginatedExample = {
    pageNumber: 1,
    pageSize: 10,
    sortDirection: 'desc',
    sortBy: 'createdAt'
}

export const pagination = (req: Request) => {

    const pageNumber = req.query.pageNumber
    if (pageNumber && !isNaN(parseInt(pageNumber.toString(), 10)) && parseInt(pageNumber.toString(), 10) > 0) {
        defaultValues.pageNumber = parseInt(pageNumber.toString(), 10)
    }
    const pageSize = req.query.pageSize
    if (pageSize && !isNaN(parseInt(pageSize.toString(), 10)) && parseInt(pageSize.toString(), 10) > 0)
        defaultValues.pageSize = parseInt(pageSize.toString(), 10)

    const sortDirection = req.query.sortDirection
    if (sortDirection && req.query.sortDirection === 'asc' ? 'asc' : 'desc')
        defaultValues.sortDirection.toString()

    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    if (sortBy && req.query.sortBy === 'createdAt')
        defaultValues.sortBy.toString()

    return defaultValues

}

export const input = new Paginated(defaultValues)

console.log(input)


