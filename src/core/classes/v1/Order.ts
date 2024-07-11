import {ExtraService} from "./ExtraService";
import {BookingItem} from "./BookingItem";
import {RoomReserve} from "./RoomReserve";
import {Person} from "./Person";
import {Legal} from "./Legal";

export class Order {
    bookingItems: BookingItem[]

    customerType: 'legal' | 'individual'
    customer: Person | Legal

    guests: Person[]
    roomReserves: RoomReserve[]
    extraServices: ExtraService[]

    constructor(o: Partial<Order> = {}) {
        this.bookingItems = o.bookingItems !== undefined ? o.bookingItems : [new BookingItem()]

        this.customerType = o.customerType !== undefined ? o.customerType : 'individual'
        this.customer = o.customer !== undefined ? o.customer : this.customerType === 'individual' ? new Person() : new Legal()

        this.guests = o.guests !== undefined ? o.guests : []
        this.roomReserves = o.roomReserves !== undefined ? o.roomReserves : []
        this.extraServices = o.extraServices !== undefined ? o.extraServices : []
    }
}