import {FilterUnit} from "./FilterUnit";

export type FilterOptionsType<T extends {}> = {
    filter?: Filter<T>
}

export class Filter<T extends {}> {
    filterProps: Map<FilterUnit<T>['id'],FilterUnit<T>>

    constructor(options: FilterOptionsType<T> = {}) {
        this.filterProps = options.filter ? options.filter.filterProps : new Map()
        this.check = this.check.bind(this)
    }

    addFilter(f: FilterUnit<T>) {
        this.filterProps.set(f.id, f)
    }

    getFilter(id: FilterUnit<T>['id']){
        return this.filterProps.get(id)
    }

    removeFilter(id: FilterUnit<T>['id']) {
        this.filterProps.delete(id)
    }

    check(item: T) {
        const itr = this.filterProps.values()
        let f = itr.next().value
        while(f) {
            if (!f.check(item)) return false
            f= itr.next().value
        }
        return true
    }

    any(items: T[]) {
        if (!this.filterProps.size) return items

        const filters = Array.from(this.filterProps.values())
        return items.filter(item => {
            for (const f of filters) {
                if (f.check(item)) return true
            }
            return false
        })
    }

    filter(items: T[]) {
        if (!this.filterProps.size) return items

        const filters = Array.from(this.filterProps.values())
        return items.filter(item => {
            for (const f of filters) {
                if (!f.check(item)) return false
            }
            return true
        })
    }
}


