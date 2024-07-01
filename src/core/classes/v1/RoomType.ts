import {Bed} from "./Bed";
import {Board} from "./Board";
import {Room} from "./Room";


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

    private _board: Board


    constructor(b: Board, r: RoomType){
        this.id = r.id
        this.desc = r.desc
        this.name = r.name
        this.area = r.area
        this.property_id = r.property_id
        this.room_type_beds = Array.isArray(r.room_type_beds)
            ? r.room_type_beds.map(bed => new Bed(b, bed))
            : []

        this._board = b
        this._board.roomTypes.set(this.id, this)
    }



    get property(){
        return this._board.properties.get(this.property_id)
    }

    get roomsByName(){
        const rooms = this.property?.getRooms().filter(r=> r.room_type_id === this.id) || []
        return rooms.reduce<{[key: string]: Room[]}>((a,r) => {
            if(!a[r.name]) a[r.name] = []
            a[r.name].push(r)
            return a
        }, {})
    }

    get rooms(){
        return Array.from(this._board.roomsByRoomType.get(this.id)?.values() || [])
    }

}