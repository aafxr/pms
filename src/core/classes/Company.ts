/** Система налогообложения */
export enum TaxType {
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
export class Company {
    /**
     * обязательное
     * название компании
     * заполняется автоматически по введенному ИНН
     */
    name?: string

    /**
     * обязательное
     * ИНН
     */
    INN?: number

    /** Система налогообложения */
    taxs?: TaxType[]

    /** Номер расчетного счета */
    invoiceNumber?: number

    /** Номер корреспондентского счета */
    correspondentInvoiceNumber?: number


    /** Название банка */
    bankName?: string

    /** БИК */
    BIK?: string

    /** Логотип */
    logo?: any


}


/**
 * представление юр-лица
 */
export class UR_Company extends Company {
    /**
     * обязательное
     * КПП
     */
    KPP?: number

    /**
     * обязательное
     * ОГРН
     */
    OGRN?: number

    /**
     * обязательное
     * дата выдачи ОГРН
     */
    OGRN_date?: Date
}


export class IP_Company extends Company {
    /**
     * обязательное
     * ОГРНИП
     */
    OGRNIP?: number

    /**
     * обязательное
     * дата выдачи ОГРНИП
     */
    OGRNIP_date?: Date
}