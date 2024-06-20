import {Rooms} from "./Rooms";
import {Room} from "./Room";

type RoomBlockPeriodConstructorType = Omit<RoomBlockPeriod, 'from' | 'to'> & {from: string | Date, to: string | Date}

export class RoomBlockPeriod{
    id: number
    room_id:Room['id']
    from: Date
    to: Date

    private rooms: Rooms

    constructor(rbp: RoomBlockPeriodConstructorType) {
        this.id = rbp.id
        this.room_id = rbp.room_id
        this.from = new Date(rbp.from)
        this.to = new Date(rbp.to)

        this.rooms = Rooms.instance
    }


    get room(){
        return this.rooms.getById(this.room_id)
    }
}