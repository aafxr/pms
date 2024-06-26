import {Board} from "./Board";
import {BookingItem} from "./BookingItem";
import {RoomBlockPeriod} from "./RoomBlockPeriod";

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
        return this.booking.reduce<Array<{ span: number, offset: number, bocking: BookingItem }>>((acc, b, i) => {
            if(b.checked_out_at.getTime() < date.getTime()) return acc

            let span = Math.ceil((b.checked_out_at.getTime() - date.getTime())/ 86_400_000)//b.daysCount
            span = Math.min(span, b.daysCount)
            if(span > 0){
                let offset = Math.ceil((b.checked_in_at.getTime() - date.getTime()) / 86_400_000)
                offset = Math.max(1, offset)
                acc.push({offset, span, bocking: b})
            }
            return acc
        }, []) || []
    }

    getBlockingPeriods(date: Date){
        return this.blocking?.reduce<Array<{ span: number, offset: number, blocking: RoomBlockPeriod }>>((acc, rb, i) => {
            if(rb.to.getTime() < date.getTime()) return acc

            let span = Math.ceil((rb.to.getTime() - date.getTime())/ 86_400_000)
            span = Math.min(span, rb.blockDays)
            if(span > 0) {
                let offset = Math.ceil((rb.from.getTime() - date.getTime()) / 86_400_000)
                offset = Math.max(1, offset)
                acc.push({offset, span, blocking: rb})
            }
            return acc
        }, []) || []

    }
}