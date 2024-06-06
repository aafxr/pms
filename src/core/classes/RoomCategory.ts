import {BathroomSettings} from "./BathroomSettings";
import {LivingSpaceSettings} from "./LivingSpaceSettings";
import {MediaAndTechnologySettings} from "./MediaAndTechnologySettings";

export class RoomCategory {
    /**
     * Название
     * Редактируемое
     * Обязательное
     */
    name:string

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
    comfortInfo:string

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

}


export enum BedType{
    /** Одноместная */
    SINGLE,
    /** Двухместная */
    DOUBLE
}