import {Property} from "../Property";
import {RoomCategory} from "./RoomCategory";

export class Room {
    /**
     * Объект размещения
     * Редактируемое
     * Обязательное
     * Данные для этого списка формируются из
     * созданных в системе Объектов размещения
     */
    property: Property

    /**
     * Номер
     * Редактируемое
     * Обязательное
     */
    value: number

    /**
     * Этаж
     * Редактируемое
     * Обязательное
     */
    floor: number

    /**
     * Дополнительная информация
     * Редактируемое
     * Обязательное
     */
    info:string

    /**
     * Категория номера
     * Редактируемое
     * Обязательное
     * Данные для этого списка формируются из
     * созданных в системе Категории номеров
     */
    category: RoomCategory

    /**
     * Доступность номера
     * Редактируемое
     * Обязательное
     * Значение: Доступен/Не доступен
     */
    available: boolean

    /**
     * Период недоступности номера (с)
     * Редактируемое
     */
    unavailableFrom_date:Date

    /**
     * Период недоступности номера (по)
     * Редактируемое
     */
    unavailableTo_date:Date

    /**
     * Номер недоступен без периода
     * Редактируемое
     */
    unavailableWithoutTimeRange: boolean


    constructor(room: Partial<Room> = {}) {
        this.property                       = room.property !== undefined ? room.property : new Property()
        this.value                          = room.value !== undefined ? room.value : 0
        this.floor                          = room.floor !== undefined ? room.floor : 0
        this.info                           = room.info !== undefined ? room.info : ''
        this.category                       = room.category !== undefined ? new RoomCategory(room.category) : new RoomCategory()
        this.available                      = room.available !== undefined ? room.available : false
        this.unavailableFrom_date           = room.unavailableFrom_date !== undefined ? new Date(room.unavailableFrom_date) : new Date(0)
        this.unavailableTo_date             = room.unavailableTo_date !== undefined ? new Date(room.unavailableTo_date) : new Date(0)
        this.unavailableWithoutTimeRange    = room.unavailableWithoutTimeRange !== undefined ? room.unavailableWithoutTimeRange : false
    }
}