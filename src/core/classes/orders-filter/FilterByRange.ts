import {FilterUnit} from "./FilterUnit";
import {BookingItem} from "../v1/BookingItem";


/**
 * фильтр BookingItems по ключу key
 * и учиановленному диапазону времени
 */
export class FilterByRange extends FilterUnit<BookingItem>{
    id: number;
    name: string;

    key: keyof Pick<BookingItem, 'checked_in_at' | 'checked_out_at' >
    from?: Date
    to?: Date

    constructor(f: Partial<FilterByRange> = {}) {
        super();
        this.id = f.id !== undefined ? f.id : -1
        this.name = f.name !== undefined ? f.name : ''
        this.from = f.from !== undefined ? f.from : undefined
        this.to = f.to !== undefined ? f.to : undefined
        this.key = f.key !== undefined ? f.key : 'checked_in_at'


    }


    check(v: BookingItem): boolean {
        const val = v[this.key]
        if (this.from && this.to) {
            return this.from.getTime() <= (val?.getTime() || 0) && (val?.getTime() || 0) <= this.to.getTime()
        } else if(this.from){
            return this.from.getTime() <= (val?.getTime() || 0)
        } else if(this.to){
            return (val?.getTime() || 0) <= this.to.getTime()
        }

        return false;
    }


}