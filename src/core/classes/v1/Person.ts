import {GenderType} from "../../types/GenderType";
import {Board} from "./Board";

/**
 * Таблица: individual_persons
 *
 * Сущность: "Физическое лицо"
 *
 * Описание: Справочник физических лиц в рабочем пространстве
 *
 * Схема:
 * - workspace_id - Внешний ключ на сущность "Рабочее пространство"
 * - first_name - Имя
 * - middle_name - Отчество
 * - last_name - Фамилия
 * - phone - Номер телефона
 * - email - Электронная почта
 * - gender - Пол
 * - birthdate - Дата рождения
 */
export class Person{
    id: number
    /** Внешний ключ на сущность "Рабочее пространство" */
    workspace_id: number
    /** Имя*/
    first_name: string
    /** Отчество */
    middle_name: string
    /** Фамилия */
    last_name: string
    /** Номер телефона */
    phone: string
    /**Электронная почта */
    email: string
    /** Пол */
    gender: GenderType
    /** Дата рождения */
    birthdate: string

    private _board: Board

    constructor(b: Board, p: Person) {
        this.id = p.id
        this.workspace_id = p.workspace_id
        this.first_name = p.first_name
        this.middle_name = p.middle_name
        this.last_name = p.last_name
        this.phone = p.phone
        this.email = p.email
        this.gender = p.gender
        this.birthdate = p.birthdate

        this._board = b
        this._board.persons.set(this.id, this)
    }

    get fullName(){
        return `${this.last_name} ${this.first_name} ${this.middle_name}`
    }
}