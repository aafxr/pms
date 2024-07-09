import {FilterUnit} from "./FilterUnit";
import {BookingItem} from "../v1/BookingItem";

export class FilterByRentStrategy extends FilterUnit<BookingItem> {
    id: number;
    name: string;

    daily: boolean
    hourly: boolean


    constructor(f: Partial<FilterByRentStrategy> = {}) {
        super();
        this.id = f.id !== undefined ? f.id : -1
        this.name = f.name !== undefined ? f.name : ''
        this.daily = f.daily !== undefined ? f.daily : false
        this.hourly = f.hourly !== undefined ? f.hourly : false
    }

    check(v: BookingItem): boolean {
        if (this.daily && v.type === 'daily') return true
        if (this.hourly && v.type === "hourly") return true
        return false;
    }


}