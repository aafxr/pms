import {Property} from "./Property";
import {Company, IP_Company} from "./Company";

/**
 * Дополнительные услуги — это перечень услуг, предоставляемых вне рамок
 * стандартного бронирования
 */
export class ExtraService {
    /**
     * Редактируемое
     * Обязательное
     */
    name: string

    /**
     * Тип дополнительной услуги
     *
     * Редактируемое
     * Обязательное
     *
     * Данные для этого списка формируются из
     * созданных в системе Типов дополнительных услуг
     */
    type: Array<unknown>

    /**
     * Привязанный объект размещения
     *
     * Редактируемое
     * Обязательное
     *
     * Данные для этого списка формируются из
     * созданных в системе Объектов размещения
     */
    propertie: Property

    /**
     * Привязанная компания
     *
     * Редактируемое
     * Обязательное
     *
     * Данные для этого списка формируются из
     * созданных в системе Компаний
     */
    company: Company

    /**
     * Фото
     *
     * Редактируемое
     * Множественное
     */
    photos: Array<unknown>

    /**
     * Описание
     *
     * Редактируемое
     */
    description: string


    constructor(extraService: Partial<ExtraService> = {}) {
        this.name           = extraService.name !== undefined ? extraService.name : ''
        this.type           = extraService.type !== undefined ? extraService.type : []
        this.propertie      = extraService.propertie !== undefined ? new Property(extraService.propertie) : new Property()
        this.company        = extraService.company !== undefined ? new IP_Company(extraService.company) : new IP_Company()
        this.photos         = extraService.photos !== undefined ? extraService.photos : []
        this.description    = extraService.description !== undefined ? extraService.description : ''
    }
}