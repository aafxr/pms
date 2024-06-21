import {Properties} from "./Properties";
import {RoomTypes} from "./RoomTypes";
import {RoomBlockPeriods} from "./RoomBlockPeriods";

export class Room {
    id: string
    name: string
    property_id: number
    room_type_id: number

    private _properties: Properties
    private _roomTypes: RoomTypes
    private _blocking: RoomBlockPeriods


    constructor(r: Room) {
        this.id = r.id
        this.name = r.name
        this.property_id = r.property_id
        this.room_type_id = r.room_type_id

        this._properties = Properties.instance
        this._roomTypes = RoomTypes.instance
        this._blocking = RoomBlockPeriods.instance
    }

    get roomType() {
        return this._roomTypes.getById(this.room_type_id)
    }

    get property() {
        return this._properties.getById(this.property_id)
    }

    get blocking() {
        return this._blocking.getBlockPeriods(this.id)
    }

    isBlock(d: Date) {
        return this.blocking.some(b => b.from.getTime() <= d.getTime() && d.getTime() <= b.to.getTime())
    }
}