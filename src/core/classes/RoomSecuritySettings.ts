/**
 * Безопасность
 *
 * Редактируемое
 * Обязательное
 *
 * Значения списка:
 * 1. Сейф
 * 2. Вход по электронной карте
 * 3. Датчики дыма
 * 4. Огнетушитель
 * 5. Система пожаротушения
 * 6. Охранная сигнализация
 *
 * Имеется возможность добавить новое значение в
 * список
 */
export class RoomSecuritySettings {
    safe = false
    electronicCardAccess = false
    smokeDetectors = false
    fireExtinguisher = false
    fireExtinguishingSystem = false
    securityAlarm = false;
    [key:string]: boolean

    constructor(options: Partial<RoomSecuritySettings>) {
        const keys =  Object.keys(options) as Array<keyof RoomSecuritySettings>
        for (const key of keys) {
            this[key] = options[key]!
        }
    }
}