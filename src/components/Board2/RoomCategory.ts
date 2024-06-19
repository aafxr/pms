import {Property} from "./Property";
import {RoomBed} from "./RoomBed";

export type RoomCategoryType = {
    area: number,
    desc: string
    id: number
    name: string
    property_id: number
    room_type_beds: []
}


export class RoomCategory{
    id: number
    /**площадь комнаты */
    area: number
    /** описание */
    desc: string
    /** название квтегории */
    name: string
    property_id: number
    property?: Property
    room_type_beds: RoomBed[]

    constructor(category: Partial<RoomCategory>) {
        this.id = category.id !== undefined ? category.id : 0
        this.area = category.area !== undefined ? category.area : 0
        this.desc = category.desc !== undefined ? category.desc : ''
        this.name = category.name !== undefined ? category.name : ''
        this.property_id = category.property_id !== undefined ? category.property_id : 0
        this.property = category.property !== undefined ? category.property : new Property()
        this.room_type_beds = category.room_type_beds !== undefined ? [...category.room_type_beds] : []
    }
}