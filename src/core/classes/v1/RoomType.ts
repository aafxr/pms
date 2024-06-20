import {Bed} from "./Bed";
import {Properties} from "./Properties";


/**
 * Таблица: room_types
 *
 * Сущность: "Категория номеров"
 *
 * Описание: Список категорий номеров
 *
 * Схема:
 * - property_id - Внешний ключ на сущность "Объект размещения"
 * - name - Название категории номера. Мультиязычно.
 * - desc - Описание категории номера. Мультиязычно.
 * - area - Площадь, кв. м.
 */
export class RoomType{
    id: number
    /** Описание категории номера. Мультиязычно. */
    desc: string
    /** Название категории номера. Мультиязычно. */
    name: string
    /** Площадь, кв. м. */
    area: number
    /** Внешний ключ на сущность "Объект размещения"*/
    property_id: number
    room_type_beds: Bed[]

    properties: Properties


    constructor(r: RoomType){
        this.id = r.id
        this.desc = r.desc
        this.name = r.name
        this.area = r.area
        this.property_id = r.property_id
        this.room_type_beds = Array.isArray(r.room_type_beds)
            ? r.room_type_beds.map(b => new Bed(b))
            : []

        this.properties = Properties.instance
    }



    get property(){
        return this.properties.getById(this.property_id)
    }
}