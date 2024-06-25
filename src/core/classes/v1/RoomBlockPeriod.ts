import {Rooms} from "./Rooms";
import {Room} from "./Room";
import {Board} from "./Board2";

type RoomBlockPeriodConstructorType = Omit<RoomBlockPeriod, 'from' | 'to'> & {from: string | Date, to: string | Date}

export class RoomBlockPeriod{
    id: number
    room_id:Room['id']
    from: Date
    to: Date

    private _board: Board

    constructor(b: Board, rbp: RoomBlockPeriod | RoomBlockPeriodConstructorType) {
        this.id = rbp.id
        this.room_id = rbp.room_id
        this.from = new Date(rbp.from)
        this.to = new Date(rbp.to)

        this._board = b
        if(!this._board.blocking.has(this.room_id)) this._board.blocking.set(this.room_id, [])
        this._board.blocking.get(this.room_id)!.push(this)
    }


    get room(){
        return this._board.rooms.get(this.room_id)
    }
}