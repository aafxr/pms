import {RoomBlockPeriod} from "./RoomBlockPeriod";
import {BookingItem} from "./BookingItem";
import {Pagination} from "./Pagination";
import {RoomType} from "./RoomType";
import {Property} from "./Property";
import {BedDesc} from "./BedDesc";
import {Booking} from "./Booking";
import {Person} from "./Person";
import {Room} from "./Room";
import {Bed} from "./Bed";

export class Board {
    persons:  Map<Person['id'], Person>
    bookingItems: Map<BookingItem['id'], BookingItem>
    booking: Map<Booking['id'], Booking>
    properties: Map<Property['id'], Property>
    roomTypes: Map<RoomType['id'], RoomType>
    beds: Map<Bed['id'], Bed>
    rooms: Map<Room['id'], Room>
    bedTypes: Map<BedDesc['id'], BedDesc>
    blocking: Map<RoomBlockPeriod['room_id'], RoomBlockPeriod[]>

    private _pagination: Pagination


    constructor() {
        this.properties = new Map()//+
        this.bedTypes = new Map() //+
        this.persons = new Map() //+
        this.bookingItems = new Map() //+
        this.booking = new Map() //+
        this.rooms = new Map() //+
        this.roomTypes = new Map() //+
        this.blocking = new Map() //+
        this.beds = new Map() //+

        this._pagination = new Pagination()
    }


    clone(){
        const b = new Board()
        Array.from(this.persons.values())
            .forEach(el => new Person(b, el))

        Array.from(this.bookingItems.values())
            .forEach(el => new BookingItem(b, el))

        Array.from(this.booking.values())
            .forEach(el => new Booking(b, el))

        Array.from(this.properties.values())
            .forEach(el => new Property(b, el))

        Array.from(this.roomTypes.values())
            .forEach(el => new RoomType(b, el))

        Array.from(this.beds.values())
            .forEach(el => new Bed(b, el))

        Array.from(this.rooms.values())
            .forEach(el => new Room(b, el))

        Array.from(this.bedTypes.values())
            .forEach(el => new BedDesc(b, el))

        Array.from(this.blocking.values())
            .forEach(els =>
                els.forEach(el => new RoomBlockPeriod(b, el))
            )

        b.pagination = new Pagination(this.pagination)

        return b
    }


    merge(b:Board){
        Array.from(b.persons.values())
            .forEach(el => new Person(this, el))

        Array.from(b.bookingItems.values())
            .forEach(el => new BookingItem(this, el))

        Array.from(b.booking.values())
            .forEach(el => new Booking(this, el))

        Array.from(b.properties.values())
            .forEach(el => new Property(this, el))

        Array.from(b.roomTypes.values())
            .forEach(el => new RoomType(this, el))

        Array.from(b.beds.values())
            .forEach(el => new Bed(this, el))

        Array.from(b.rooms.values())
            .forEach(el => new Room(this, el))

        Array.from(b.bedTypes.values())
            .forEach(el => new BedDesc(this, el))

        Array.from(b.blocking.values())
            .forEach(els =>
                els.forEach(el => new RoomBlockPeriod(this, el))
            )

        this.pagination = new Pagination(b.pagination)

        return this
    }

    get pagination(){
        return this._pagination
    }

    set pagination(p: Pagination){
        this._pagination = new Pagination(p)
    }

}

