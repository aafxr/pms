import {Properties} from "./Properties";
import {RoomTypes} from "./RoomTypes";

export class Room{
    id: string
    name: string
    property_id: number
    room_type_id: number

    private properties: Properties
    private roomTypes: RoomTypes


    constructor(r: Room) {
        this.id = r.id
        this.name = r.name
        this.property_id = r.property_id
        this.room_type_id = r.room_type_id

        this.properties = Properties.instance
        this.roomTypes = RoomTypes.instance
    }

    get roomType(){
        return this.roomTypes.getById(this.room_type_id)
    }

    get property(){
        return this.properties.getById(this.property_id)
    }
}