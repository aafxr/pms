import {GenderType} from "../../types/GenderType";
import {IValid} from "../interfaces/IValid";

export class Guest implements IValid<Guest>{
    id: number
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

    constructor(guest: Partial<Guest> = {}) {

        this.id = guest.id !== undefined ? guest.id : -1
        this.first_name = guest.first_name !== undefined ? guest.first_name : ''
        this.middle_name = guest.middle_name !== undefined ? guest.middle_name : ''
        this.last_name = guest.last_name !== undefined ? guest.last_name : ''

        this.phone = guest.phone !== undefined ? guest.phone : ''
        let phone = this.phone.replace(/D/, '');
        const res = /^\+?(\d{1})\(*(\d{3})\)*(\d{3})-*(\d{1,4})/.exec(this.phone)
        if(res){
            const [f, v1,v2,v3,v4] = res
            this.phone = `+${v1}(${v2})${v3}-${v4}`
        }

        this.email = guest.email !== undefined ? guest.email : ''
        this.gender = guest.gender !== undefined ? guest.gender : 'male'
        this.birthdate = guest.birthdate !== undefined ? guest.birthdate : ''
    }

    set phoneNumber(text:string){
        this.phone = text !== undefined ? text : ''
        let phone = this.phone.replace(/D/, '');
        const res = /^\+?(\d{1})\(*(\d{3})\)*(\d{3})-*(\d{1,4})/.exec(this.phone)
        if(res){
            const [f, v1,v2,v3,v4] = res
            this.phone = `+${v1}(${v2})${v3}-${v4}`
        }
    }

    validate(): Partial<Record<keyof Guest, string>> {
        const res: Partial<Record<keyof Guest, string>> = {}

        if(this.first_name.length < 2) {
            res.first_name = 'Поле должно содердать не менее 2 символов'
        }

        if(this.last_name.length < 2) {
            res.last_name = 'Поле должно содердать не менее 2 символов'
        }

        if(this.phone.replace(/\D/, '').length < 11){
            res.phone = 'Не корректно указан номер телефона'
        }

        return res;
    }
}