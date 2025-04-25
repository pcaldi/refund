type RefundsAPIResponse = {
    id: string
    userId: string
    name: string
    filename: string
    category: CategoriesAPIEnum
    amount: number
    user: {
        name: string
    }
}


type RefundsPaginationAPIResponse = {
    refunds: RefundsAPIResponse[]
    page: number
    perPage: number
    totalPages: number
    totalRecords: number
}
