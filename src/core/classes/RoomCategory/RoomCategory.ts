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
    name?: string

    /**
     * Количество спальных мест
     * Редактируемое
     * Обязательное
     */
    beds?: number

    /**
     * Количество дополнительных спальных мест
     * Редактируемое
     * Обязательное
     */
    extraBeds?: number

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
    bedType?: BedType

    /**
     * Редактируемое
     * Обязательное
     * Множественное
     */
    photo?: Array<unknown>

    /**
     * Удобства в номере
     * Редактируемое
     * Обязательное
     */
    comfortInfo?:string

    /**
     * Ванная комната
     * Редактируемое
     * Обязательное
     */
    bathroomSettings?: BathroomSettings

    /**
     * Жилое помещение
     * Редактируемое
     * Обязательное
     */
    livingSpace?: LivingSpaceSettings

    /**
     * Медиа и технологии
     * Редактируемое
     * Обязательное
     */
    mediaAndTechnology?: MediaAndTechnologySettings

    /**
     * Безопасность
     * Редактируемое
     * Обязательное
     */
    security?: RoomSecuritySettings

    /**
     * Сервисы
     * Редактируемое
     * Обязательное
     */
    services?: RoomServicesSettings

    /**
     * Другое
     * Редактируемое
     * Обязательное
     */
    other?: RoomOtheSettings

}


export enum BedType{
    /** Одноместная */
    SINGLE,
    /** Двухместная */
    DOUBLE
}