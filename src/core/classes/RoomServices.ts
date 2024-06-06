/**
 * Сервисы
 *
 * Редактируемое
 * Необязательное
 *
 * Значения списка:
 * 1. Ежедневная уборка
 * 2. Хранение багажа
 * 3. Прачечная
 * 4. Лифт до этажа
 *
 * Имеется возможность добавить новое значение в
 * список
 */
export class RoomServices {
    dailyCleaning = false
    luggageStorage = false
    laundry = false
    elevator = false;
    [key: string]: boolean

    constructor(options: Partial<RoomServices>) {
        const keys =  Object.keys(options) as Array<keyof RoomServices>
        for (const key of keys) {
            this[key] = options[key]!
        }
    }
}