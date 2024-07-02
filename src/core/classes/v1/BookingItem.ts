import {BookingTimeStrategyType} from "../../types/BookingTimeStrategyType";
import {BookingStatus} from "../../types/BookingStatus";
import {RoomType} from "./RoomType";
import {Board} from "./Board";
import {Booking} from "./Booking";
import {Room} from "./Room";

/**
 * Таблица: booking_items
 *
 * Сущность: "Бронирование"
 *
 * Описание: В данной таблице хранятся бронирования. Подразумевает бронь одного объекта аренды - номер, или доп объект аренды.
 *
 * Схема:
 * - booking_id - Внешний ключ на сущность "Сделка"
 * - tariff_id - Внешний ключ на сущность “Тариф”
 * - type - Тип бронирования. Принимает одно из значений BookingItemType.
 * - object_type - Тип полиморфной связи “Объект бронирования”. Указывает, на какую таблицу базы данных ссылается связь. Либо room, либо additional_object.
 * - object_id - Внешний ключ полиморфной сущности “Объект бронирования”.
 * - status - Статус бронирования.
 * - checked_in_at - Время заезда
 * - checked_out_at - Время выезда
 * - adults_count - Количество взрослых
 * - kids_count - Количество детей
 * - comment - Комментарий
 */
export class BookingItem{
    id: number
    /** Внешний ключ на сущность "Сделка"*/
    booking_id: number
    /** Внешний ключ на сущность “Тариф”*/
    tariff_id: number
    /** Тип бронирования. Принимает одно из значений BookingItemType.*/
    type: BookingTimeStrategyType
    /** Тип полиморфной связи “Объект бронирования”. Указывает, на какую таблицу базы данных ссылается связь. Либо room, либо additional_object.*/
    object_type: null | string
    /** Внешний ключ полиморфной сущности “Объект бронирования”.*/
    object_id: number | null
    /** Статус бронирования.*/
    status: BookingStatus
    /** Время заезда*/
    checked_in_at: Date
    /** Время выезда*/
    checked_out_at: Date
    /** Количество взрослых*/
    adults_count: number
    /** Количество детей*/
    kids_count: number
    /** Комментарий*/
    comment: string
    price: number
    room_type_id: RoomType['id']

    private _days: number


    private _board: Board


    constructor(board: Board, b: BookingItem) {
        this.id = b.id
        this.booking_id = b.booking_id
        this.tariff_id = b.tariff_id
        this.type = b.type
        this.object_type = b.object_type
        this.object_id = b.object_id
        this.status = b.status
        this.checked_in_at = new Date(b.checked_in_at)
        this.checked_out_at = new Date(b.checked_out_at)
        this.adults_count = b.adults_count
        this.kids_count = b.kids_count
        this.comment = b.comment
        this.price = b.price
        this.room_type_id = b.room_type_id
        this._days = 1

        this._board = board
        this._board.bookingItems.set(this.id, this)

        this._board.bookigStatuses.add(this.status)

        if(this.object_type === "room"){
            if(!this._board.roomBookings.has(this.object_id as Room['id'])){
                this._board.roomBookings.set(this.object_id as Room['id'], new Map())
            }
            this._board.roomBookings.get(this.object_id as Room['id'])?.set(this.id, this)
        }

        const booking = b.booking
        if(booking) new Booking(board, booking)

        this.calcDaysCount()
    }


    private calcDaysCount(){
        const s = new Date(this.checked_in_at.getFullYear(), this.checked_in_at.getMonth(), this.checked_in_at.getDate())
        const e = new Date(this.checked_out_at.getFullYear(), this.checked_out_at.getMonth(), this.checked_out_at.getDate(), 23, 59, 59, 999)
        this._days = Math.ceil((e.getTime() - s.getTime()) / 86_400_000)
    }

    get daysCount(){
        return this._days
    }

    get roomType(){
        return this._board.roomTypes.get(this.room_type_id)
    }

    get booking(){
        return this._board.booking.get(this.booking_id)
    }

    get property(){
        return this.roomType?.property
    }

    get room(){
        if(this.object_type === "room"){
            return this._board.rooms.get(this.object_id as Room['id'])
        }
    }

    get textDateRange(){
        const d_in = this.checked_in_at.toLocaleDateString('ru-RU', {day: "numeric", month: "numeric", year: "2-digit"} )
        const t_in = this.checked_in_at.toLocaleTimeString('ru-RU', {hour: "2-digit", minute: "2-digit"} )

        const d_out = this.checked_out_at.toLocaleDateString('ru-RU', {day: "numeric", month: "numeric", year: "2-digit"} )
        const t_out = this.checked_out_at.toLocaleTimeString('ru-RU', {hour: "2-digit", minute: "2-digit"} )

        return `${d_in}(${t_in}) - ${d_out}(${t_out})`
    }

}