import {Person} from "./Person";

export class Legal{
    /**
     * обязательное
     *
     * название компании
     *
     * заполняется автоматически по введенному ИНН
     */
    name: string

    management: Person

    /**
     * обязательное
     * ИНН
     */
    inn: number
    kpp: number
    ogrn: number
    ogrn_date?: Date
    registration_date?: Date

    address: string
    address_fact: string



    // реквизиты банка
    bik: number

    /** Номер расчетного счета */
    invoiceNumber: number

    /** Номер корреспондентского счета */
    correspondentInvoiceNumber: number

    /** Название банка */
    bankName: string


    constructor(company: Partial<Legal> = {}) {
        this.name           = company.name !== undefined ? company.name : ''
        this.management      = company.management !== undefined ? company.management : new Person()
        this.inn = company.inn !== undefined ? company.inn : -1
        this.kpp = company.kpp !== undefined ? company.kpp : -1
        this.ogrn = company.ogrn !== undefined ? company.ogrn : -1
        this.ogrn_date = company.ogrn_date !== undefined ? company.ogrn_date : undefined
        this.registration_date = company.registration_date !== undefined ? company.registration_date : undefined
        this.address = company.address !== undefined ? company.address : ''
        this.address_fact = company.address_fact !== undefined ? company.address_fact : ''

        this.bik = company.bik !== undefined ? company.bik : 0
        this.invoiceNumber = company.invoiceNumber !== undefined ? company.invoiceNumber : 0
        this.correspondentInvoiceNumber = company.correspondentInvoiceNumber !== undefined ? company.correspondentInvoiceNumber : 0
        this.bankName = company.bankName !== undefined ? company.bankName : ''
    }
}