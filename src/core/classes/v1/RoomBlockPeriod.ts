import {Room} from "./Room";
import {Board} from "./Board";

type RoomBlockPeriodConstructorType = Omit<RoomBlockPeriod, 'from' | 'to'> & {from: string | Date, to: string | Date}

export class RoomBlockPeriod{
    id: number
    room_id:Room['id']
    from: Date
    to: Date

    private _board: Board
    private _blockDays: number

    constructor(b: Board, rbp: RoomBlockPeriod | RoomBlockPeriodConstructorType) {
        this.id = rbp.id
        this.room_id = rbp.room_id
        this.from = new Date(rbp.from)
        this.to = new Date(rbp.to)

        this._board = b
        if(!this._board.blocking.has(this.room_id)) this._board.blocking.set(this.room_id, new Map())
        this._board.blocking.get(this.room_id)!.set(this.id, this)

        this._blockDays = 1

         this.calcBlockDays()
    }

    private calcBlockDays(){
        const s = new Date(this.from.getFullYear(), this.from.getMonth(), this.from.getDate())
        const e = new Date(this.to.getFullYear(), this.to.getMonth(), this.to.getDate(), 23, 59, 59, 999)
        this._blockDays = Math.ceil((e.getTime() - s.getTime()) / 86_400_000)
    }


    get room(){
        return this._board.rooms.get(this.room_id)
    }

    get blockDays(){
        return this._blockDays
    }
}