import {Booking} from "./Booking";

export class Bookings{
    private static _instance: Bookings
    private bookings: Map<Booking['id'], Booking>

    private constructor() {
        this.bookings = new Map()
    }

    static get instance(){
        if(!this._instance){
            this._instance = new this()
        }
        return this._instance
    }


    add(b: Booking){
        if(this.bookings.has(b.id)) return
        this.bookings.set(b.id, new Booking(b))
    }

    getById(id: Booking['id']){
        return this.bookings.get(id)
    }

    count(){
        return this.bookings.size
    }

    list(){
        return Array.from(this.bookings.values())
    }
}