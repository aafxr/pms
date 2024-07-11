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

    private _board?: Board


    constructor(r: Partial<RoomType> = {}, b?: Board){
        this.id = r.id !== undefined ? r.id : -1
        this.desc = r.desc !== undefined ? r.desc : ''
        this.name = r.name !== undefined ? r.name : ''
        this.area = r.area !== undefined ? r.area : -1
        this.property_id = r.property_id !== undefined ? r.property_id : -1
        this.room_type_beds = Array.isArray(r.room_type_beds)
            ? r.room_type_beds.map(bed => new Bed(bed, b))
            : []

        if(b) this.board = b
    }


    private _mountBoard(){
        if (!this._board) return
        this._board.roomTypes.set(this.id, this)
    }


    private _unmountBoard(){
        if (!this._board) return
        this._board.roomTypes.delete(this.id)
    }


    set board(b: Board){
        if (this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }



    get property(){
        return this._board?.properties.get(this.property_id)
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
        return Array.from(this._board?.roomsByRoomType.get(this.id)?.values() || [])
    }


    getFreeRooms(d:Date){
        const rooms = this.rooms
        return rooms.reduce((acc, r) => r.isBlockDay(d).length > 0 ? acc - 1 : acc,rooms.length)
    }

}