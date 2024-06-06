/**
 * Жилое помещение
 *
 * Редактируемое
 * Обязательное
 *
 * Значения списка:
 * 1. Кровать
 * 2. Шкаф или Гардероб
 * 3. Диван
 * 4. Кресло
 * 5. Тумбочка
 * 6. Зеркало
 * 7. Стул
 * 8. Рабочий стол
 * 9. Журнальный столик
 * 10. Кондиционер
 * 11. Вентилятор
 * 12. Лампы и настольные лампы
 * 13. Ковёр
 * 14. Холодильник
 * 15. Чайник
 * 16. Набор посуды
 * 17. Гладильные принадлежности
 * 18. Розетки
 * 19. Урны для мусора
 *
 * Имеется возможность добавить новое значение в
 * список
 */
export class LivingSpaceSettings {
    bed = false
    wardrobe = false
    sofa = false
    armchair = false
    nightstand = false
    mirror = false
    chair = false
    desk = false
    coffeeTable = false
    aircondition = false
    fan = false
    lampsAndTableLamps = false
    carpet = false
    refrigerator = false
    kettle = false
    setOfDishes = false
    ironingAccessories = false
    sockets = false
    garbageBins = false;
    [key: string]: boolean

    constructor(options: Partial<LivingSpaceSettings>) {
        const keys =  Object.keys(options) as Array<keyof LivingSpaceSettings>
        for (const key of keys) {
            this[key] = options[key]!
        }
    }
}