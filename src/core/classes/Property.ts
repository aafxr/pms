import {Room} from "./RoomCategory/Room";

/**
 * имущество / собственность
 *
 * объект размещения / некая собственность
 */
export class Property {
    /**
     * Редактируемое
     * Обязательное
     */
    name: string

    /**
     * Редактируемое
     * Обязательное
     *
     * Данные для этого списка формируются
     * из созданных в системе Типов объектов
     * размещения
     */
    type:unknown


    /**
     * Редактируемое
     * Обязательное
     *
     * Данные для этого списка формируются
     * из созданных в системе Компаний
     */
    company: unknown

    /**
     * Редактируемое
     *
     * файл
     */
    logo:unknown

    /**
     * Редактируемое
     *
     * Список с количеством звезд от 1 до 5
     */
    stars: number

    /**
     * Редактируемое
     * Обязательное
     */
    timeZone: unknown

    /**
     * Редактируемое
     * Обязательное
     */
    country: unknown

    /**
     * Редактируемое
     * Обязательное
     */
    index:number

    /**
     * Редактируемое
     * Обязательное
     */
    city: string

    /**
     * Редактируемое
     * Обязательное
     */
    address:string

    /**
     * Редактируемое
     * Обязательное
     */
    checkin_date: Date

    /**
     * Редактируемое
     * Обязательное
     */
    checkout_date: Date

    /**
     * Информационное
     *
     * Выводит информацию о привязанных
     * дополнительных услугах
     */
    extraServices:unknown

    /**
     * Нередактируемое
     *
     * Выводит информацию о привязанных
     * номерах
     */
    rooms: Room[]

    /**
     * Редактируемое
     *
     * Доплата за ранний заезд
     */
    extraPayForEarlyCheckin: string

    /**
     * Редактируемое
     *
     * Доплата за поздний выезд
     */
    extraPayForLateCheckOut: string


    constructor(property: Partial<Property> = {}) {
        this.name           = property.name !== undefined ? property.name : ''
        this.type           = property.type !== undefined ? property.type : ''
        this.company        = property.company !== undefined ? property.company : ''
        this.logo           = property.logo !== undefined ? property.logo : ''
        this.stars          = property.stars !== undefined ? property.stars : 0
        this.timeZone       = property.timeZone !== undefined ? property.timeZone : ''
        this.country        = property.country !== undefined ? property.country : ''
        this.index          = property.index !== undefined ? property.index : 0
        this.city           = property.city !== undefined ? property.city : ''
        this.address        = property.address !== undefined ? property.address : ''
        this.checkin_date   = property.checkin_date !== undefined ? new Date(property.checkin_date) : new Date(0)
        this.checkout_date  = property.checkout_date !== undefined ? new Date(property.checkout_date) : new Date(0)
        this.extraServices  = property.extraServices !== undefined ? property.extraServices : ''
        this.rooms          = property.rooms !== undefined ? property.rooms : []
        this.extraPayForEarlyCheckin   = property.extraPayForEarlyCheckin !== undefined ? property.extraPayForEarlyCheckin : ''
        this.extraPayForLateCheckOut   = property.extraPayForLateCheckOut !== undefined ? property.extraPayForLateCheckOut : ''
    }

}