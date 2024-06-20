import {BookingType} from "../../types/BookingType";
import {BookingStatus} from "../../types/BookingStatus";
import {Bookings} from "./Bookings";
import {RoomTypes} from "./RoomTypes";
import {RoomType} from "./RoomType";

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
    type: BookingType
    /** Тип полиморфной связи “Объект бронирования”. Указывает, на какую таблицу базы данных ссылается связь. Либо room, либо additional_object.*/
    object_type: null | string
    /** Внешний ключ полиморфной сущности “Объект бронирования”.*/
    object_id: number
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


    private bookings: Bookings
    private roomTypes: RoomTypes


    constructor(b: BookingItem) {
        this.id = b.id
        this.booking_id = b.booking_id
        this.tariff_id = b.tariff_id
        this.type = b.type
        this.object_type = b.object_type
        this.object_id = b.object_id
        this.status = b.status
        this.checked_in_at = b.checked_in_at
        this.checked_out_at = b.checked_out_at
        this.adults_count = b.adults_count
        this.kids_count = b.kids_count
        this.comment = b.comment
        this.price = b.price
        this.room_type_id = b.room_type_id

        this.roomTypes = RoomTypes.instance
        this.bookings = Bookings.instance
        if(b.booking) this.bookings.add(b.booking)
    }



    get roomType(){
        return this.roomTypes.getById(this.room_type_id)
    }
    get booking(){
        return this.bookings.getById(this.booking_id)
    }
}