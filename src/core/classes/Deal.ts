import {User} from "./employee/User";
import {Company, UR_Company} from "./Company";
import {ExtraService} from "./ExtraService";
import {Room} from "./RoomCategory/Room";
import {Property} from "./Property";

export class Deal {
    /**
     * Редактируемое
     *
     * Обязательное
     *
     * Множественное
     *
     * Возможно прикрепление Гостей из списка, если
     * они ранее уже были введены в систему
     * Возможен переход к созданию нового Гостя
     * Возможен переход к странице конкретного Гостя
     */
    customer: User[]

    /**
     * Редактируемое
     *
     * Множественное
     *
     * Обязательное (при корпоративном бронировании)
     *
     * Возможно прикрепление Организации из списка,
     * если данные ранее уже были введены в систему
     * Возможен переход к созданию новой Организации
     * Возможен переход к странице конкретной
     * Организации
     */
    company: string

    /**
     * Редактируемое
     *
     * Обязательное
     *
     * Множественное
     *
     * Содержит:
     * - Дату и время заезда
     * - Дату и время выезда
     * - Кол-во ночей
     * - Кол-во гостей
     * - Кол-во детей
     */
    dateAndPeopleCount: string

    /**
     * Редактируемое
     *
     * Обязательное
     *
     * Множественное
     *
     * Содержит:
     * - категорию
     * - тариф
     * - номер комнаты
     * - кол-во гостей
     * - стоимость
     */
    tariff: string

    /**
     * Редактируемое
     *
     * Множественно
     *
     * Обязательное
     *
     * Выбираются из списка дополнительных услуг
     */
    services: Array<ExtraService>

    /**
     * Нерадактируемое
     */
    total: string

    /**
     *  Редактируемое
     *
     * Выбирается из списка введенных в систему
     * Источников поступления Заказа
     */
    orderSource: Array<unknown>


    /**
     * Редактируемое
     *
     * Необязательное
     *
     * Вводится польователем
     */
    customerComment: string

    /**
     * Редактируемое
     *
     * Обязательное
     *
     * Автоматически заполняется исходя из данных о
     * Пользователе, создавшем Сделку
     * Представляет собой строку, содержащую ФИО
     * сотрудника со ссылкой на страницу Сотрудника
     * Имеется возможность назначить другого
     * сотрудника, выбрав его из списка пользователей
     * Рабочего пространства (при условии наличия у
     * пользователя прав на работу со сделками)
     */
    responisbleWorker: string

    /**
     * Информационное
     *
     * Множественное
     *
     * Заполняется автоматически при создании Задачи
     * по Сделке (или переводе готовой Задачи в Сделку)
     * Имеется возможность перехода в странице
     * конкретной Задачи
     * Имеется возможность начать цикл создания Задачи
     * по текущей Сделке
     */
    tasks: Array<any>

    /**
     * Редактируемое
     *
     * Обязательное
     *
     * Множественное
     *
     * Возможно прикрепление Гостей из списка, если
     * они ранее уже были введены в систему
     * Содержит:
     * Гость [взрослый/ребенок]
     * Пол [мужской/женский]
     * Номер телефона
     * Фио
     * Гражданство
     * Паспортные данные
     */
    guests: User[]

    /**
     * Информационное
     * Заполняется автоматически при создании гостей
     *
     * Содержит:
     * Кол-во гостей
     * Взрослые [кол-во]
     * Дети [кол-во]
     * Фио гостей списком
     */
    guestsInfo: string

    checkin: Date
    checkout: Date

    /**
     * Редактируемое
     *
     * Обязательное
     *
     * Содержит:
     * категорию
     * тариф
     * номер комнаты
     * кол-во гостей
     * стоимость
     */
    room: Room

    /**
     * Информационное
     *
     * Заполняется автоматически при создании гостей
     * Содержит:
     * Кол-во гостей
     * Взрослые [кол-во]
     * Дети [кол-во]
     * Фио гостей списком
     */
    checkinInfo: string

    /**
     * Редактируемое
     * Множественное
     * Заполняется исходя из списка услуг, доступных в
     * Объекте размещения
     */
    extraServices: Array<ExtraService>

    /**
     * Редактируемое
     *
     * Множественное
     *
     * Заполняется автоматически при вводе информации
     * об объекте аренды
     * Содержит:
     * - Номер
     * - Дата заезда-дата выезда
     * - Кол-во ночей
     * - Сумма
     * - Скидка
     * - Итого
     * Начислено
     * Оплачено
     */
    rent: Array<any>


    /**
     * Редактируемое
     *
     * Множественное
     *
     * Заполняется автоматически при вводе информации
     * о доп. объектах аренды
     */
    extraProperties: Property[]
    /**
     * Информационное
     * Заполняется автоматически
     * Содержит:
     * Проживание [сумма]
     * Услуг в тарифе [сумма]
     * Дополнительные услуги [сумма]
     * К оплате [сумма]
     * Оплачено [сумма]
     * Всего [сумма]
     */
    payment: Array<any>


    constructor(deal: Partial<Deal>) {
        this.customer           = deal.customer !== undefined ? deal.customer : []
        this.company            = deal.company !== undefined ? deal.company : ''
        this.dateAndPeopleCount = deal.dateAndPeopleCount !== undefined ? deal.dateAndPeopleCount : ''
        this.tariff             = deal.tariff !== undefined ? deal.tariff : ''
        this.services           = deal.services !== undefined ? deal.services : []
        this.total              = deal.total !== undefined ? deal.total : ''
        this.orderSource        = deal.orderSource !== undefined ? deal.orderSource : []
        this.customerComment    = deal.customerComment !== undefined ? deal.customerComment : ''
        this.responisbleWorker  = deal.responisbleWorker !== undefined ? deal.responisbleWorker : ''
        this.tasks              = deal.tasks !== undefined ? deal.tasks : []
        this.guests             = deal.guests !== undefined ? deal.guests : []
        this.guestsInfo         = deal.guestsInfo !== undefined ? deal.guestsInfo : ''
        this.checkin            = deal.checkin !== undefined ? deal.checkin : new Date()
        this.checkout           = deal.checkout !== undefined ? deal.checkout : new Date()
        this.room               = deal.room !== undefined ? deal.room : new Room()
        this.checkinInfo        = deal.checkinInfo !== undefined ? deal.checkinInfo : ''
        this.extraServices      = deal.extraServices !== undefined ? deal.extraServices : []
        this.rent               = deal.rent !== undefined ? deal.rent : []
        this.extraProperties    = deal.extraProperties !== undefined ? deal.extraProperties : []
        this.payment            = deal.payment !== undefined ? deal.payment : []
    }


}
