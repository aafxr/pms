import {RoomBlockPeriod} from "./RoomBlockPeriod";
import {BookingItem} from "./BookingItem";
import {Pagination} from "./Pagination";
import {RoomType} from "./RoomType";
import {Property} from "./Property";
import {BedDesc} from "./BedDesc";
import {Booking} from "./Booking";
import {Tariff} from "./Tariff";
import {Person} from "./Person";
import {Room} from "./Room";
import {Bed} from "./Bed";
import {ExtraService} from "./ExtraService";

export class Board {
    persons:  Map<Person['id'], Person>
    bookingItems: Map<BookingItem['id'], BookingItem>
    booking: Map<Booking['id'], Booking>
    properties: Map<Property['id'], Property>
    roomTypes: Map<RoomType['id'], RoomType>
    beds: Map<Bed['id'], Bed>
    rooms: Map<Room['id'], Room>
    bedTypes: Map<BedDesc['id'], BedDesc>
    tariffs: Map<Tariff['id'], Tariff>
    extraServices: Map<ExtraService['id'], ExtraService>

    blocking: Map<RoomBlockPeriod['room_id'], Map<RoomBlockPeriod['id'], RoomBlockPeriod>>
    roomBookings: Map<Room['id'], Map<BookingItem['id'], BookingItem>>
    roomsByRoomType: Map<Room['room_type_id'], Map<Room['id'], Room>>

    bookingItemsGroups: Map<BookingItem['status'], Map<BookingItem['id'], BookingItem>>

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
        this.tariffs = new Map()
        this.extraServices = new Map()

        this.roomBookings = new Map()
        this.roomsByRoomType = new Map()

        this._pagination = new Pagination()

        this.bookingItemsGroups = new Map()
    }


    private _refreshRoomBookings(){
        const itr = this.bookingItems.values()
        let b = itr.next().value
        while (b){
            if(b.object_type === "room"){
                if(!b._board.roomBookings.has(b.object_id as Room['id'])){
                    b._board.roomBookings.set(b.object_id as Room['id'], new Map())
                }
                b._board.roomBookings.get(b.object_id as Room['id'])?.set(b.id, b)
            }
            b = itr.next().value
        }
    }

    refresh(){
        this._refreshRoomBookings()
    }


    clone(){
        const b = new Board()
        Array.from(this.persons.values())
            .forEach(el => new Person(el, b))

        Array.from(this.bookingItems.values())
            .forEach(el => new BookingItem(el, b))

        Array.from(this.booking.values())
            .forEach(el => new Booking(el, b))

        Array.from(this.properties.values())
            .forEach(el => new Property(el, b))

        Array.from(this.roomTypes.values())
            .forEach(el => new RoomType(el, b))

        Array.from(this.beds.values())
            .forEach(el => new Bed(el, b))

        Array.from(this.rooms.values())
            .forEach(el => new Room(el, b))

        Array.from(this.bedTypes.values())
            .forEach(el => new BedDesc(el, b))

        Array.from(this.tariffs.values())
            .forEach(el => new Tariff(el, b))

        Array.from(this.extraServices.values())
            .forEach(el => new ExtraService(el, b))

        Array.from(this.blocking.values())
            .forEach(els =>
                els.forEach(el => new RoomBlockPeriod(b, el))
            )

        b.pagination = new Pagination(this.pagination)

            b.refresh()

        return b
    }


    merge(b:Board){
        Array.from(b.persons.values())
            .forEach(el => new Person(el, this))

        Array.from(b.bookingItems.values())
            .forEach(el => new BookingItem(el, this))

        Array.from(b.booking.values())
            .forEach(el => new Booking(el, this))

        Array.from(b.properties.values())
            .forEach(el => new Property(el, this))

        Array.from(b.roomTypes.values())
            .forEach(el => new RoomType(el, this))

        Array.from(b.beds.values())
            .forEach(el => new Bed(el, this))

        Array.from(b.rooms.values())
            .forEach(el => new Room(el, this))

        Array.from(b.bedTypes.values())
            .forEach(el => new BedDesc(el, this))

        Array.from(b.tariffs.values())
            .forEach(el => new Tariff(el, this))

        Array.from(b.extraServices.values())
            .forEach(el => new ExtraService(el, this))

        Array.from(b.blocking.values())
            .forEach(els =>
                els.forEach(el => new RoomBlockPeriod(this, el))
            )

        this.pagination = new Pagination(b.pagination)

        this._refreshRoomBookings()

        return this
    }

    get pagination(){
        return this._pagination
    }

    set pagination(p: Pagination){
        this._pagination = new Pagination(p)
    }

    clear(){
        this.persons.clear()
        this.bookingItems.clear()
        this.booking.clear()
        this.properties.clear()
        this.roomTypes.clear()
        this.beds.clear()
        this.rooms.clear()
        this.bedTypes.clear()
        this.blocking.clear()
        this.roomBookings.clear()
        this.roomsByRoomType.clear()
        this.bookingItemsGroups.clear()
    }

    get bookingStatuses(){
        const res: {[key : string]: number} = {}
        const itr = this.bookingItemsGroups.entries()
        let entre = itr.next().value
        while(entre){
            res[entre[0]] = res[entre[1]]
            entre = itr.next()
        }
        return res
    }

}

