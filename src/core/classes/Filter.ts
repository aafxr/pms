export type FilterOptionsType<T extends {}> = {
    filter?: Filter<T>
}

export class Filter<T extends {}> {
    filterProps: FilterProp<T>[]

    constructor(options: FilterOptionsType<T> = {}) {
        this.filterProps = options.filter ? [...options.filter.filterProps] : []
        this.check = this.check.bind(this)
    }

    addFilter(f: FilterProp<T>) {
        const idx = this.filterProps.findIndex(e => e.id === f.id)
        if(idx !== -1) {
            this.filterProps[idx] = f
            return
        }

        this.filterProps.push(f)
    }

    removeFilter(id: FilterProp<T>['id']) {
        this.filterProps = this.filterProps.filter(f => f.id === id)
    }

    check(item: T) {
        for (const f of this.filterProps) {
            if (!f.check(item)) return false
        }
        return true
    }

    any(items: T[]) {
        if (!this.filterProps.length) return items

        return items.filter(item => {
            for (const f of this.filterProps) {
                if (!f.check(item)) return true
            }
            return false
        })
    }

    filter(items: T[]) {
        if (!this.filterProps.length) return items
        return items.filter(item => {
            for (const f of this.filterProps) {
                if (!f.check(item)) return false
            }
            return true
        })
    }
}


export class FilterProp<T extends {}> {
    id: number
    /** describe what prop this filter check */
    name: string
    compareFn: (v: T) => boolean

    constructor(id: number, name: string, compareFn: (v: T) => boolean) {
        this.id = id
        this.name = name
        this.compareFn = compareFn
    }

    check(v: T) {
        return this.compareFn(v)
    }
}