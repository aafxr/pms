import {Board} from "./Board";
import {BookingItem} from "./BookingItem";

export class Room {
    id: number
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
        }
        return this.blocking?.filter(b => check(b.from) || check(b.to)) || []
    }

    get booking(){
        return Array.from(this._board.bookingItems.values())
            .filter(b=> b.object_id === this.id)
    }

    getBookingOffset(date: Date){
        return this.booking.reduce<Array<{ span: number, offset: number, bockingList: BookingItem[] }>>((acc, b, i) => {
            const prev = acc[acc.length - 1]
            const prev_offset = prev?.offset + prev?.span || 0
            const offset = Math.ceil((b.checked_in_at.getTime() - date.getTime()) / 86_400_000)
            const span = b.daysCount
            if (prev && offset < prev_offset) {
                if (offset + span > prev_offset) {
                    prev.span = offset + span - prev.offset
                }
                prev.bockingList.push(b)
                return acc
            }
            acc.push({offset, span, bockingList: [b]})
            return acc
        }, [])
    }
}