import {RoomBlockPeriod} from "./RoomBlockPeriod";
import {RoomType} from "./RoomType";
import {Board} from "./Board";
import {Room} from "./Room";

export class Property{
    id: number
    name: string

    private _board: Board

    constructor(b: Board, p: Property) {
        this.id = p.id
        this.name = p.name


        this._board = b
        this._board.properties.set(this.id, this)

    }

    addBlocking(b:RoomBlockPeriod){
        if(!this._board.blocking.has(b.room_id)) this._board.blocking.set(b.room_id,[])
        this._board.blocking.get(b.room_id)!.push(b)
    }

    getBlocking(roomId: Room['id']){
        return this._board.blocking.get(roomId) || []
    }

    getRooms(): Room[]{
        return Array.from(this._board.rooms.values())
            .filter(r => r.property_id === this.id)
    }

    getRoomTypes(): RoomType[]{
        return Array.from(this._board.roomTypes.values())
            .filter(c => c.property_id === this.id)
    }

    getRoomsByCategory(categoryId: RoomType['id']){
        return this.getRooms().filter(r => r.room_type_id === categoryId)
    }
}