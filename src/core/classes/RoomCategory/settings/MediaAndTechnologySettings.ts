/**
 * Медиа и технологии
 *
 * Редактируемое
 * Обязательное
 *
 * Значения списка:
 * 1. Телевизор
 * 2. Wi-Fi
 * 3. Кабельное/спутниковое ТВ
 * 4. Проводной интернет
 * 5. Телефон
 *
 * Имеется возможность добавить новое значение в
 * список
 */
export class MediaAndTechnologySettings {
    tv = false
    wifi = false
    cableORSatelliteTV = false
    wiredInternet = false
    telephone = false;
    [key: string]: boolean

    constructor(options:Partial<MediaAndTechnologySettings> = {}) {
        const keys =  Object.keys(options) as Array<keyof MediaAndTechnologySettings>
        for (const key of keys) {
            this[key] = options[key]!
        }
    }
}