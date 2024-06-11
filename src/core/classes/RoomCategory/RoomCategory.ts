import {BathroomSettings} from "./settings/BathroomSettings";
import {LivingSpaceSettings} from "./settings/LivingSpaceSettings";
import {MediaAndTechnologySettings} from "./settings/MediaAndTechnologySettings";
import {RoomSecuritySettings} from "./settings/RoomSecuritySettings";
import {RoomServicesSettings} from "./settings/RoomServicesSettings";
import {RoomOtheSettings} from "./settings/RoomOtheSettings";

export class RoomCategory {
    /**
     * Название
     * Редактируемое
     * Обязательное
     */
    name: string

    /**
     * Количество спальных мест
     * Редактируемое
     * Обязательное
     */
    beds: number

    /**
     * Количество дополнительных спальных мест
     * Редактируемое
     * Обязательное
     */
    extraBeds: number

    /**
     * Тип спального места
     *
     * Редактируемое
     *
     * Обязательное
     *
     * Значения списка:
     * - Двухместная
     * - Одноместная
     */
    bedType: BedType

    /**
     * Редактируемое
     * Обязательное
     * Множественное
     */
    photo: Array<unknown>

    /**
     * Удобства в номере
     * Редактируемое
     * Обязательное
     */
    comfortInfo: string

    /**
     * Ванная комната
     * Редактируемое
     * Обязательное
     */
    bathroomSettings: BathroomSettings

    /**
     * Жилое помещение
     * Редактируемое
     * Обязательное
     */
    livingSpace: LivingSpaceSettings

    /**
     * Медиа и технологии
     * Редактируемое
     * Обязательное
     */
    mediaAndTechnology: MediaAndTechnologySettings

    /**
     * Безопасность
     * Редактируемое
     * Обязательное
     */
    security: RoomSecuritySettings

    /**
     * Сервисы
     * Редактируемое
     * Обязательное
     */
    services: RoomServicesSettings

    /**
     * Другое
     * Редактируемое
     * Обязательное
     */
    other: RoomOtheSettings


    constructor(roomCategory: Partial<RoomCategory> = {}) {
        this.name                  = roomCategory.name !== undefined ? roomCategory.name : ''
        this.beds                  = roomCategory.beds !== undefined ? roomCategory.beds : 0
        this.extraBeds             = roomCategory.extraBeds !== undefined ? roomCategory.extraBeds : 0
        this.bedType               = roomCategory.bedType !== undefined ? roomCategory.bedType : BedType.UNSET
        this.photo                 = roomCategory.photo !== undefined ? roomCategory.photo : []
        this.comfortInfo           = roomCategory.comfortInfo !== undefined ? roomCategory.comfortInfo : ''
        this.bathroomSettings      = roomCategory.bathroomSettings !== undefined ? roomCategory.bathroomSettings : new BathroomSettings()
        this.livingSpace           = roomCategory.livingSpace !== undefined ? roomCategory.livingSpace : new LivingSpaceSettings()
        this.mediaAndTechnology    = roomCategory.mediaAndTechnology !== undefined ? roomCategory.mediaAndTechnology : new MediaAndTechnologySettings()
        this.security              = roomCategory.security !== undefined ? roomCategory.security : new RoomSecuritySettings()
        this.services              = roomCategory.services !== undefined ? roomCategory.services : new RoomServicesSettings()
        this.other                 = roomCategory.other !== undefined ? roomCategory.other : new RoomOtheSettings()
    }

}


export enum BedType{
    UNSET,
    /** Одноместная */
    SINGLE,
    /** Двухместная */
    DOUBLE,
}