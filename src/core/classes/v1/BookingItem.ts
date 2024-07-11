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
    checked_in_at?: Date
    /** Время выезда*/
    checked_out_at?: Date
    /** Количество взрослых*/
    adults_count: number
    /** Количество детей*/
    kids_count: number
    /** Комментарий*/
    comment: string
    price: number
    room_type_id: RoomType['id']

    /** Включить ранний въезд */
    include_early_check_in: boolean
    /** Включить поздний выезд */
    include_early_check_out: boolean

    /** Такса за ранний въезд */
    early_check_in_tax: number
    /** Валюта. См. “описание цен и валют п.2”. */
    early_check_in_tax_currency: string
    /** Такса за поздний выезд */
    late_check_out_tax: number
    /** Валюта. См. “описание цен и валют п.2”. */
    late_check_out_tax_currency: string
    /** Комментарий */

    private _days: number
    private _booking: Booking


    private _board: Board | undefined


    constructor(b: Partial<BookingItem> = {}, board?: Board) {
        this.id = b.id !==undefined ? b.id : -1
        this.booking_id = b.booking_id !==undefined ? b.booking_id : -1
        this.tariff_id = b.tariff_id !==undefined ? b.tariff_id : -1
        this.type = b.type !==undefined ? b.type : 'daily'
        this.object_type = b.object_type !==undefined ? b.object_type : ''
        this.object_id = b.object_id !==undefined ? b.object_id : -1
        this.status = b.status !==undefined ? b.status : 'awaiting'
        this.checked_in_at = b.checked_in_at !==undefined ? new Date(b.checked_in_at) : undefined
        this.checked_out_at = b.checked_out_at !==undefined ? new Date(b.checked_out_at) : undefined
        this.adults_count = b.adults_count !==undefined ? b.adults_count : 0
        this.kids_count = b.kids_count !==undefined ? b.kids_count : 0
        this.comment = b.comment !==undefined ? b.comment : ''
        this.price = b.price !==undefined ? b.price : 0
        this.room_type_id = b.room_type_id !==undefined ? b.room_type_id : -1
        this._days = 1

        this.include_early_check_in = b.include_early_check_in !== undefined ? b.include_early_check_in : false
        this.include_early_check_out = b.include_early_check_out !== undefined ? b.include_early_check_out : false

        this.early_check_in_tax = b.early_check_in_tax !== undefined ? b.early_check_in_tax : 0
        this.early_check_in_tax_currency = b.early_check_in_tax_currency !== undefined ? b.early_check_in_tax_currency : ''
        this.late_check_out_tax = b.late_check_out_tax !== undefined ? b.late_check_out_tax : 0
        this.late_check_out_tax_currency = b.late_check_out_tax_currency !== undefined ? b.late_check_out_tax_currency : ''

        const booking = b.booking
        this._booking = booking ? new Booking(booking, board) : new Booking()

        this.calcDaysCount()

        if(board) this.board = board
    }


    private _mountBoard(){
        if (!this._board) return
        this._board.bookingItems.set(this.id, this)

        if(!this._board.bookingItemsGroups.has(this.status)) {
            this._board.bookingItemsGroups.set(this.status, new Map())
        }
        this._board.bookingItemsGroups.get(this.status)!.set(this.id, this)

        if(this.object_type === "room"){
            if(!this._board.roomBookings.has(this.object_id as Room['id'])){
                this._board.roomBookings.set(this.object_id as Room['id'], new Map())
            }
            this._board.roomBookings.get(this.object_id as Room['id'])?.set(this.id, this)
        }
    }


    private unmountBoard(){
        if(!this._board) return
        this._board.bookingItems.delete(this.id)

        this._board.bookingItemsGroups.get(this.status)?.delete(this.id)

        if(this.object_type === "room"){
            this._board.roomBookings.get(this.object_id as Room['id'])?.delete(this.id)
        }
    }


    set board(b: Board){
        if(this._board) this.unmountBoard()
        this._board = b
        this._mountBoard()
        this._booking.board = b
    }


    private calcDaysCount(){
        if (this.checked_in_at && this.checked_out_at) {
            const s = new Date(this.checked_in_at.getFullYear(), this.checked_in_at.getMonth(), this.checked_in_at.getDate())
            const e = new Date(this.checked_out_at.getFullYear(), this.checked_out_at.getMonth(), this.checked_out_at.getDate(), 23, 59, 59, 999)
            this._days = Math.ceil((e.getTime() - s.getTime()) / 86_400_000)
        }
    }

    get daysCount(){
        return this._days
    }

    get roomType(){
        return this._board?.roomTypes.get(this.room_type_id)
    }

    get booking(){
        return this._booking
    }

    get property(){
        return this.roomType?.property
    }

    get room(){
        if(this.object_type === "room"){
            return this._board?.rooms.get(this.object_id as Room['id'])
        }
    }

    get textDateRange(){
        let result = ''
        const d_in = this.checked_in_at?.toLocaleDateString('ru-RU', {day: "numeric", month: "numeric", year: "2-digit"} )
        const t_in = this.checked_in_at?.toLocaleTimeString('ru-RU', {hour: "2-digit", minute: "2-digit"} )
        if(d_in && t_in) result = `${d_in}(${t_in})`

        const d_out = this.checked_out_at?.toLocaleDateString('ru-RU', {day: "numeric", month: "numeric", year: "2-digit"} )
        const t_out = this.checked_out_at?.toLocaleTimeString('ru-RU', {hour: "2-digit", minute: "2-digit"} )
        if(d_out && t_out) result += `- ${d_out}(${t_out})`

        return result
    }

}