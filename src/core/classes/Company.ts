import {FieldsCheckResult, IFieldsCheck} from "../interfaces/IFieldsCheck";

/** Система налогообложения */
export enum TaxType {
    DEFAULT,
    /** Общая */
    REGULAR,
    /** УСН 6% */
    USN_6,
    /** УСН 15% */
    USN_15,
    /** ПСН */
    PSN,
    /** ЕНВД */
    ENVD,
    /** НПД */
    NPD
}

/**
 * общее представление лицв предоставляющего услуги размещентя
 *
 * все поля редактируемые
 */
export abstract class Company /* implements IFieldsCheck*/{
    /**
     * обязательное
     *
     * название компании
     *
     * заполняется автоматически по введенному ИНН
     */
    name: string

    /**
     * обязательное
     * ИНН
     */
    INN: number

    /** Система налогообложения */
    tax: TaxType

    /** Номер расчетного счета */
    invoiceNumber: number

    /** Номер корреспондентского счета */
    correspondentInvoiceNumber: number


    /** Название банка */
    bankName: string

    /** БИК */
    BIK: string

    /** Логотип */
    logo: any

    created_at: Date

    director: string
    directorPhone: string


    constructor(company: Partial<Company> = {}) {
        this.name           = company.name !== undefined ? company.name : ''
        this.INN            = company.INN !== undefined ? company.INN : 0
        this.tax            = company.tax !== undefined ? company.tax : TaxType.DEFAULT
        this.invoiceNumber  = company.invoiceNumber !== undefined ? company.invoiceNumber : 0
        this.correspondentInvoiceNumber     = company.correspondentInvoiceNumber !== undefined ? company.correspondentInvoiceNumber : 0
        this.bankName       = company.bankName !== undefined ? company.bankName : ''
        this.BIK            = company.BIK !== undefined ? company.BIK : ''
        this.logo           = company.logo !== undefined ? company.logo : ''
        this.created_at     = company.created_at !== undefined ? new Date(company.created_at) : new Date(0)
        this.director       = company.director !== undefined ? company.director : ''
        this.directorPhone  = company.directorPhone !== undefined ? company.directorPhone : ''
    }


    /** проверка на заполнение всех полей */
    // abstract checkFields(): FieldsCheckResult


}


/**
 * представление юр-лица
 */
export class UR_Company extends Company {
    /**
     * обязательное
     * КПП
     */
    KPP: number

    /**
     * обязательное
     * ОГРН
     */
    OGRN: number

    /**
     * обязательное
     * дата выдачи ОГРН
     */
    OGRN_date: Date

    ur_address: string
    fizics_address: string


    constructor(ur_company: Partial<UR_Company> = {}) {
        super(ur_company);
        this.KPP        = ur_company.KPP !== undefined ? ur_company.KPP : 0
        this.OGRN       = ur_company.OGRN !== undefined ? ur_company.OGRN : 0
        this.OGRN_date  = ur_company.OGRN_date !== undefined ? ur_company.OGRN_date : new Date(0)
        this.ur_address = ur_company.ur_address !== undefined ? ur_company.ur_address : ''
        this.fizics_address = ur_company.fizics_address !== undefined ? ur_company.fizics_address : ''
    }
}


export class IP_Company extends Company {
    /**
     * обязательное
     * ОГРНИП
     */
    OGRNIP: number

    /**
     * обязательное
     * дата выдачи ОГРНИП
     */
    OGRNIP_date: Date


    constructor(ip_company: Partial<IP_Company> = {}) {
        super(ip_company);
        this.OGRNIP         = ip_company.OGRNIP !== undefined ? ip_company.OGRNIP  : 0
        this.OGRNIP_date    = ip_company.OGRNIP_date !== undefined ? ip_company.OGRNIP_date : new Date(0)
    }
}