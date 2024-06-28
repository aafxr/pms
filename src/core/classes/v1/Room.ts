import {Board} from "./Board";
import {BookingItem} from "./BookingItem";
import {RoomBlockPeriod} from "./RoomBlockPeriod";
import {BookingTimeStrategyType} from "../../types/BookingTimeStrategyType";

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
        return this._board.blocking.get(this.id) || []
    }

    isBlockTime(d: Date) {
        return !!this.blocking?.some(b => b.from.getTime() <= d.getTime() && d.getTime() <= b.to.getTime())
    }

    isBlockDay(d: Date) {
        const check = (date: Date) => {
            return date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()
        }
        return this.blocking?.filter(b => check(b.from) || check(b.to)) || []
    }

    get booking() {
        return Array.from(this._board.roomBookings.get(this.id)?.values() || [])
    }

    getBookingOffset(date: Date, strategy: BookingTimeStrategyType) {
        return this.booking.reduce<Array<{ span: number, offset: number, bocking: BookingItem }>>((acc, b, i) => {
            if (b.checked_out_at.getTime() < date.getTime()) return acc

            const isHourly = strategy === 'hourly'
            const divider = !isHourly ? 86_400_000 : 3_600_000

            let span = Math.ceil((b.checked_out_at.getTime() - date.getTime()) / divider)//b.daysCount
            const coef = isHourly ? b.daysCount * 24 : b.daysCount
            span = Math.min(span, coef)

            if (span > 0) {
                let offset = Math.ceil(((b.checked_in_at.getTime() - date.getTime()) || 1) / divider)
                offset = Math.max(1, offset)
                acc.push({offset, span, bocking: b})
            }
            return acc
        }, []) || []
    }

    getBlockingPeriods(date: Date, strategy: BookingTimeStrategyType) {
        return this.blocking?.reduce<Array<{
            span: number,
            offset: number,
            blocking: RoomBlockPeriod
        }>>((acc, rb, i) => {
            if (rb.to.getTime() < date.getTime()) return acc
            const isHourly = strategy === 'hourly'
            const divider = !isHourly ? 86_400_000 : 3_600_000

            let span = Math.ceil((rb.to.getTime() - date.getTime()) / divider)
            const coef = isHourly ? rb.blockDays * 24 : rb.blockDays
            span = Math.min(span, coef)

            if (span > 0) {
                let offset = Math.ceil(((rb.from.getTime() - date.getTime()) || 1) / divider)
                offset = Math.max(1, offset)
                acc.push({offset, span, blocking: rb})
            }
            return acc
        }, []) || []
    }
}