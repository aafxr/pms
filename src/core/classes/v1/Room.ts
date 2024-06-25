import {Board} from "./Board";

export class Room {
    id: string
    name: string
    property_id: number
    room_type_id: number

    private _board: Board


    constructor(b: Board, r: Room) {
        this.id = r.id
        this.name = r.name
        this.property_id = r.property_id
        this.room_type_id = r.room_type_id

        this._board = b
        this._board.rooms.set(this.id, this)
    }

    get roomType() {
        return this._board.roomTypes.get(this.room_type_id)
    }

    get property() {
        return this._board.properties.get(this.property_id)
    }

    get blocking() {
        return this._board.blocking.get(this.id)
    }

    isBlockTime(d: Date) {
        return !!this.blocking?.some(b => b.from.getTime() <= d.getTime() && d.getTime() <= b.to.getTime())
    }

    isBlockDay(d:Date){
        const check = (date : Date) =>{
            return date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()
            // const s = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            // const e = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
            // return s.getTime() < d.getTime() && d.getTime() < e.getTime();

        }


        return this.blocking?.filter(b => check(b.from) || check(b.to)) || []
    }
}