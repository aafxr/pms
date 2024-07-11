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

    private _board: Board | undefined

    constructor(p: Partial<Person> = {},b?: Board) {
        this.id = p.id !== undefined ? p.id : -1
        this.workspace_id = p.workspace_id !== undefined ? p.workspace_id : -1
        this.first_name = p.first_name !== undefined ? p.first_name : ''
        this.middle_name = p.middle_name !== undefined ? p.middle_name : ''
        this.last_name = p.last_name !== undefined ? p.last_name : ''
        this.phone = p.phone !== undefined ? p.phone : ''
        this.email = p.email !== undefined ? p.email : ''
        this.gender = p.gender !== undefined ? p.gender : "male"
        this.birthdate = p.birthdate !== undefined ? p.birthdate : ''

        this._board = b
    }


    private _mountBoard(){
        if(!this._board) return
        this._board.persons.set(this.id, this)
    }


    private _unmountBoard(){
        if(!this._board) return
        this._board.persons.delete(this.id)
    }


    set board(b: Board){
        if(this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }



    get fullName(){
        return `${this.last_name} ${this.first_name} ${this.middle_name}`
    }
}