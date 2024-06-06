/**
 * Ванная комната
 *
 * Редактируемое
 * Обязательное
 *
 * Значения списка:
 * 1. Ванна
 * 2. Душ
 * 3. Туалет
 * 4. Биде
 * 5. Раковина
 * 6. Зеркало
 * 7. Туалетная бумага и мыло
 * 8. Фен
 * 9. Полотенца
 * 10. Туалетно-косметические принадлежности
 * 11. Халат и тапочки
 *
 * Имеется возможность добавить новое значение в
 * список
 */
export class BathroomSettings {
    bath = false
    shower = false
    toilet = false
    bidet = false
    sink = false
    mirror = false
    toiletPaperAndSoap = false
    hairdryer = false
    towels = false
    toiletries = false
    bathrobeAndSlippers = false;
    [key:string]: boolean

    constructor(options: Partial<BathroomSettings>) {
        const keys =  Object.keys(options) as Array<keyof BathroomSettings>
        for (const key of keys) {
            this[key] = options[key]!
        }
    }
}