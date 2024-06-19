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

class Room {
    id: number
    property_id: number
    property: Property | null
    room_type_id: number
    roomType: RoomType | null
    name: string

     constructor(r: Partial<Room> = {}) {
         this.id = r.id !== undefined ? r.id : 0
         this.property_id = r.property_id !== undefined ? r.property_id : 0
         this.property = r.property !== undefined ? r.property : new Property()
         this.room_type_id = r.room_type_id !== undefined ? r.room_type_id : 0
         this.roomType = r.roomType !== undefined ? r.roomType : new RoomType()
         this.name = r.name !== undefined ? r.name : ''
     }
}

class Property {
    id: number
    name: string
    constructor(p: Partial<Property> = {}) {
        this.id = p.id !== undefined ? p.id : 0
        this.name = p.name !== undefined ? p.name : ''
    }
}

class Bed {
    id: number
    name: string
    places: number
    constructor(bed: Partial<Bed> = {}) {
        this.id = bed.id !== undefined ? bed.id : 0
        this.name = bed.name !== undefined ? bed.name : ''
        this.places = bed.places !== undefined ? bed.places : 0
    }
}

class RoomType{
    id: number
    property_id: number
    name: string
    desc: string
    area: number
    room_type_beds: BedType[]

    constructor(r: Partial<RoomType> = {}) {
        this.id = r.id !== undefined ? r.id : 0
        this.property_id = r.property_id !== undefined ? r.property_id : 0
        this.name = r.name !== undefined ? r.name : ''
        this.desc = r.desc !== undefined ? r.desc : ''
        this.area = r.area !== undefined ? r.area : 0
        this.room_type_beds = r.room_type_beds !== undefined ? r.room_type_beds : []
    }
}

class BedType {
    id: number
    room_type_id: number
    room_bed_id: number
    count: number
    is_main: boolean
    room_bed: Bed | null

    constructor(b: Partial<BedType> = {}) {
        this.id = b.id !== undefined ? b.id : 0
        this.room_type_id = b.room_type_id !== undefined ? b.room_type_id : 0
        this.room_bed_id = b.room_bed_id !== undefined ? b.room_bed_id : 0
        this.count = b.count !== undefined ? b.count : 0
        this.is_main = b.is_main !== undefined ? b.is_main : false
        this.room_bed = b.room_bed !== undefined ? b.room_bed : null
    }
}


type FetchRoomsResponse = {
    rooms:{
        pagination: PaginationType
        rooms: Room[]
    }
    properties: Property[]
    room_types: RoomType[]

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