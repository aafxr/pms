import {Properties} from "./Properties";
import {RoomTypes} from "./RoomTypes";
import {Bookings} from "./Bookings";
import {Persons} from "./Persons";
import {Rooms} from "./Rooms";
import {Room} from "./Room";
import {RoomType} from "./RoomType";
import {Property} from "./Property";
import {Booking} from "./Booking";
import {Person} from "./Person";
import {BookingItems} from "./BookingItems";
import {BookingItem} from "./BookingItem";
import {RoomBlockPeriods} from "./RoomBlockPeriods";
import {RoomBlockPeriod} from "./RoomBlockPeriod";

export class Board {
    private _rooms: Rooms
    private _roomTypes: RoomTypes
    private _properties: Properties
    private _bookings: Bookings
    private _persons: Persons
    private _bookingItems: BookingItems
    private _blockPeriods: RoomBlockPeriods


    constructor(reset = false) {
        this._rooms = Rooms.instance
        this._roomTypes = RoomTypes.instance
        this._properties = Properties.instance
        this._bookings = Bookings.instance
        this._persons = Persons.instance
        this._bookingItems = BookingItems.instance
        this._blockPeriods = RoomBlockPeriods.instance

        if (reset) {
            this.clear()
        }
    }

    clear() {
        this._rooms.clear()
        this._roomTypes.clear()
        this._properties.clear()
        this._bookings.clear()
        this._persons.clear()
        this._bookingItems.clear()
        this._blockPeriods.clear()
    }


    add(item: Room): void;
    add(item: RoomType): void;
    add(item: Property): void;
    add(item: Booking): void;
    add(item: Person): void;
    add(item: BookingItem): void;
    add(item: RoomBlockPeriod): void;
    add(item: unknown) {
        if (item instanceof Room) {
            this._rooms.add(item)
        } else if (item instanceof RoomType) {
            this._roomTypes.add(item)
        } else if (item instanceof Property) {
            this._properties.add(item)
        } else if (item instanceof Booking) {
            this._bookings.add(item)
        } else if (item instanceof BookingItem) {
            this._bookingItems.add(item)
        } else if (item instanceof Person) {
            this._persons.add(item)
        } else if (item instanceof RoomBlockPeriod) {
            this._blockPeriods.add(item)
        }
    }

    getProperties() {
        return Array.from(this._properties.list())
    }

    getProperty(id: Property['id']) {
        return this._properties.getById(id)
    }

    getPropertyRooms(id: Property['id']): Room[] {
        return []
        // return this._properties.getById(id)?.rooms || []
    }

    getPropertyRoomTypes(id: Property['id']){
        return this._roomTypes.list().filter(rt => rt.property_id === id)
    }

    getRoomType(id: RoomType['id']) {
        return this._roomTypes.getById(id)
    }

    getRoomTypes() {
        return this._roomTypes.list()
    }

    getRoomTypeRooms(id: RoomType['id']) {
        return this._rooms.list().filter(r => r.room_type_id === id)
    }

    getRoomTypeRoomsSortByName(id: RoomType['id']) {
        return this.getRoomTypeRooms(id).reduce<{ [key: string]: Room[] }>((a, c) => {
            if (a[c.name]) {
                a[c.name].push(c)
            } else {
                a[c.name] = [c]
            }
            return a
        }, {})
    }


}

