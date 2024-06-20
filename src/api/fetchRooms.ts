import {axiosFetch} from "../axios";
import {Room} from "../core/classes/v1/Room";
import {Property} from "../core/classes/v1/Property";
import {RoomType} from "../core/classes/v1/RoomType";
import {RoomBlockPeriod} from "../core/classes/v1/RoomBlockPeriod";
import {Rooms} from "../core/classes/v1/Rooms";
import {Properties} from "../core/classes/v1/Properties";
import {RoomTypes} from "../core/classes/v1/RoomTypes";
import {RoomBlockPeriods} from "../core/classes/v1/RoomBlockPeriods";
import {Person} from "../core/classes/v1/Person";
import {Persons} from "../core/classes/v1/Persons";
import {BookingItem} from "../core/classes/v1/BookingItem";
import {BookingItems} from "../core/classes/v1/BookingItems";
import {Bookings} from "../core/classes/v1/Bookings";

type APIResponseType<T> = {
    message: string
    data: T
}

type PaginationType = {
    page: number
    per_page: number
    last_page: number
    total: number
}


type FetchRoomsResponse = {
    rooms: {
        pagination: PaginationType
        rooms: Room[]
    }
    properties: Property[]
    room_types: RoomType[]

    booking_items: BookingItem[],
    individual_persons: Person[],
    legal_entities: [],
    room_block_periods: RoomBlockPeriod[]
}


export type FetchRoomsRequestParams = {
    page?: number
    per_page?: number
    daily?: 'daily'
    start_date: Date
    end_date: Date
}

export async function fetchRooms(params: FetchRoomsRequestParams) {
    const query = new URLSearchParams()
    for (const key in params) {
        if (key.endsWith('_date')) {
            // @ts-ignore
            query.set(key, params[key].toISOString().split('.')[0])
        } else {
            // @ts-ignore
            query.set(key, params[key])
        }
    }
    const response = await axiosFetch.get<APIResponseType<FetchRoomsResponse>>(`/api/v1/timetable-bookings/rooms?${query}`)
    if (response.status === 200) {
        const data = response.data.data

        const rooms = Rooms.instance
        const properties = Properties.instance
        const roomTypes = RoomTypes.instance
        const blocking = RoomBlockPeriods.instance
        const persons = Persons.instance
        const bookingItems = BookingItems.instance
        const bookings = Bookings.instance

        data.rooms.rooms.forEach(r => rooms.add(r))
        data.properties.forEach(p => properties.add(p))
        data.room_types.forEach(rt => roomTypes.add(rt))
        data.room_block_periods.forEach(b => blocking.add(b))
        data.individual_persons.forEach(p => persons.add(p))
        data.booking_items.forEach(b => bookingItems.add(b))

        return {rooms, properties, roomTypes, blocking, persons, bookingItems, bookings}
    }
}