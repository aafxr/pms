import {axiosFetch} from "../axios";

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

type Room = {
    id: number,
    property_id: number,
    room_type_id: number,
    name: string
}

type Property = {
    id: number
    name: string
}

type Bed = {
    id: number
    name: string
    places: number
}

type RoomType<T> = {
    id: number
    property_id: number
    name: string
    desc: string
    area: number
    room_type_beds: T
}

type BedRoom<T> = {
    id: number
    room_type_id: number
    room_bed_id: number
    count: number
    is_main: boolean
    room_bed: T
}


type FetchRoomsResponse = {
    rooms:{
        pagination: PaginationType
        rooms: Room[]
    }
    properties: Property[]
    room_types: RoomType<BedRoom<Bed>>[]

    booking_items: [],
    individual_persons: [],
    legal_entities: [],
    room_block_periods: []
}



export type FetchRoomsRequestParams = {
    page?: number
    per_page?: number
    daily?: 'daily'
    start_date: Date
    end_date: Date
}

export async function fetchRooms(params: FetchRoomsRequestParams): Promise<APIResponseType<FetchRoomsResponse> | undefined>{
    const query = new URLSearchParams()
    for (const key in params){
        if(key.endsWith('_date')){
            // @ts-ignore
            query.set(key, params[key].toISOString().split('.')[0])
        }else {
            // @ts-ignore
            query.set(key, params[key])
        }
    }
    const response = await axiosFetch.get<APIResponseType<FetchRoomsResponse>>(`/api/v1/timetable-bookings/rooms?${query}`)
    if (response.status === 200){
        return response.data
    }
}