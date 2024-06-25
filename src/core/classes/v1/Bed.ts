import {BedDesc} from "./BedDesc";
import {Board} from "./Board2";


/**
 * Таблица: room_type_beds
 *
 * Сущность: "Конкретное спальное место в конкретной категории номеров"
 *
 * Описание: Промежуточная таблица для хранения связи между спальными местами и категориями номеров.
 *
 * Схема:
 * room_type_id - Внешний ключ на сущность "Категория номеров"
 * room_bed_id - Внешний ключ на сущность "Спальное место"
 * count - Количество
 * is_main - Булевый флаг. Является ли спальное место в категории номеров основным или дополнительным
 */
export class Bed {
    id: number
    /**Количество*/
    count: number
    /**Булевый флаг. Является ли спальное место в категории номеров основным или дополнительным*/
    is_main: boolean
    /**Внешний ключ на сущность "Категория номеров"*/
    room_bed_id: number
    /** Внешний ключ на сущность "Спальное место"*/
    room_type_id: number

    private _board: Board


    constructor(board: Board, b: Omit<Bed, 'bedsList'>) {
        this.id = b.id
        this.count = b.count
        this.is_main = b.is_main
        this.room_bed_id = b.room_bed_id
        this.room_type_id = b.room_type_id

        if(b.room_bed) new BedDesc(board, b.room_bed)

        this._board = board
        this._board.beds.set(this.id, this)
    }

    get roomType(){
        return this._board.roomTypes.get(this.room_type_id)
    }

    get room_bed(){
        return this._board.bedTypes.get(this.room_bed_id)
    }




}