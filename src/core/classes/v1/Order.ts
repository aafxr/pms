import {BookingItem} from "./BookingItem";

export class Order{
    bookingItems: BookingItem[]

    constructor(o : Partial<Order> = {}) {
        this.bookingItems = o.bookingItems !== undefined ? o.bookingItems : [new BookingItem()]
    }
}