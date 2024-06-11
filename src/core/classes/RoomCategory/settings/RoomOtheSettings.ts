/**
 * Другое
 *
 * Редактируемое
 * Необязательное
 *
 * Значения списка:
 * 1. Балкон
 * 2. Терраса
 *
 * Имеется возможность добавить новое значение в
 * список
 */
export class RoomOtheSettings {
    balcony = false
    terrace = false;
    [key: string]: boolean

    constructor(options: Partial<RoomOtheSettings> = {}) {
        const keys =  Object.keys(options) as Array<keyof RoomOtheSettings>
        for (const key of keys) {
            this[key] = options[key]!
        }
    }
}
