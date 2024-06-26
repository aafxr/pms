export class Pagination{
    last_page: number
    per_page: number
    page: number
    total: number

    constructor(p: Partial<Pagination> = {}) {
        this.last_page = p.last_page || 0
        this.per_page = p.per_page || 0
        this.page = p.page || 0
        this.total = p.total || 0
    }
}