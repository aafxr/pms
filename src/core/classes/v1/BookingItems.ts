import {BookingItem} from "./BookingItem";

export class BookingItems {
    private static _instance: BookingItems
    private bookingItems: Map<BookingItem['id'], BookingItem>

    private constructor() {
        this.bookingItems = new Map()
    }

    static get instance(){
        if(!this._instance){
            this._instance = new this()
        }
        return this._instance
    }

    add(b: BookingItem){
        if (this.bookingItems.has(b.id)) return
        this.bookingItems.set(b.id, new BookingItem(b))
    }

    getById(id: BookingItem['id']){
        return this.bookingItems.get(id)
    }

    count(){
        return this.bookingItems.size
    }

    list(){
        return Array.from(this.bookingItems.values())
    }

    clear(){
        this.bookingItems.clear()
    }
}