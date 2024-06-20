import {BedTypes} from "./BedTypes";


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
    bedsList: BedTypes
    /**Внешний ключ на сущность "Категория номеров"*/
    room_bed_id: number
    /** Внешний ключ на сущность "Спальное место"*/
    room_type_id: number


    constructor(b: Omit<Bed, 'bedsList'>) {
        this.id = b.id
        this.count = b.count
        this.is_main = b.is_main
        this.room_bed_id = b.room_bed_id
        this.room_type_id = b.room_type_id

        this.bedsList = BedTypes.instance
        this.bedsList.add(b.room_bed)
    }


    get room_bed() {
        return this.bedsList.getById(this.room_bed_id)!
    }
}