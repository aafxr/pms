import {BookingItem} from "./BookingItem";
import {Legal} from "./Legal";
import {Person} from "./Person";
import {RoomReserve} from "./RoomReserve";

export class Order {
    bookingItems: BookingItem[]

    customerType: 'legal' | 'individual'
    customer: Person | Legal

    guests: Person[]
    roomReserves: RoomReserve[]

    constructor(o: Partial<Order> = {}) {
        this.bookingItems = o.bookingItems !== undefined ? o.bookingItems : [new BookingItem()]

        this.customerType = o.customerType !== undefined ? o.customerType : 'individual'
        this.customer = o.customer !== undefined ? o.customer : this.customerType === 'individual' ? new Person() : new Legal()

        this.guests = o.guests !== undefined ? o.guests : []
        this.roomReserves = o.roomReserves !== undefined ? o.roomReserves : []
    }
}