import {axiosFetch} from "../axios";

import {RoomBlockPeriod} from "../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../core/classes/v1/BookingItem";
import {Property} from "../core/classes/v1/Property";
import {RoomType} from "../core/classes/v1/RoomType";
import {Person} from "../core/classes/v1/Person";
import {Room} from "../core/classes/v1/Room";

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
        return response.data.data
    }
}