export class Order {
    /**
     * Почта заказчика
     *
     * Редактируемое
     * Обязательное
     *
     * Имеет Валидацию
     */
    cEmail: string

    /**
     * ФИО заказчика
     *
     * Редактируемое
     * Обязательное
     */
    cFIO: string

    /**
     * Телефон заказчика
     *
     * Редактируемое
     * Обязательное
     *
     * Имеет Валидацию
     */
    cPhoneNumber: string

    /**
     * Желаемый Отель к заселению
     *
     * Редактируемое
     *
     * Имеется возможность прикрепить Объект
     * размещения из списка
     *
     * Имеется возможность просмотреть страницу
     * выбранного Объекта размещения
     */
    cPrefferedProperty: string

    /**
     * Желаемый Номер к заселению
     *
     * Редактируемое
     *
     * Имеется возможность прикрепить Номер из списка
     * (При условии прикрепления Объекта размещения)
     * и Дат проживания
     *
     * Имеется возможность просмотреть страницу
     * выбранного Номера
     */
    cPreferedRoom: string

    /**
     * Желаемые даты проживания
     *
     * Редактируемое
     * Обязательное
     */
    cPreferedDate: Date

    /**
     * Статус Заказа
     *
     * Редактируемое
     *
     * Имеет дефолтное значение из списка статусов
     * Меняется при движении Заказа вручную
     */
    orderStatus: OrderStatus

    /**
     * Связанное бронирование
     *
     * Информационное
     *
     * Заполняется автоматически при создании Сделки
     * по Заказу
     *
     * Представляет собой запись id сделки со ссылкой на
     * страницу Сделки
     */
    bindeedReservation: number

    /**
     * Источник поступления заказа
     *
     * Редактируемое
     *
     * Формируется при введении Заказа в систему
     * Выбирается из списка введенных в систему
     * Источников поступления Заказа
     */
    orderSource: unknown

    /**
     * Ответственный сотрудник
     *
     * Редактируемое
     * Обязательное
     *
     * Автоматически заполняется исходя из данных о
     * Пользователе, создавшем Заказ
     *
     * Представляет собой строку, содержащую ФИО
     * сотрудника со ссылкой на страницу Сотрудника
     *
     * Имеется возможность назначить другого
     * сотрудника, выбрав его из списка пользователей
     *
     * Рабочего пространства (при условии наличия у
     * пользователя прав на работу со сделками)
     */
    responsibleEmloyee: string

    /**
     * Дата создания
     *
     * Информационное
     *
     * Формируется автоматически при создании Заказа
     */
    created_at: Date

    constructor(order: Partial<Order> = {}) {
        this.cEmail                 = order.cEmail !== undefined ? order.cEmail : ''
        this.cFIO                   = order.cFIO !== undefined ? order.cFIO : ''
        this.cPhoneNumber           = order.cPhoneNumber !== undefined ? order.cPhoneNumber : ''
        this.cPrefferedProperty     = order.cPrefferedProperty !== undefined ? order.cPrefferedProperty : ''
        this.cPreferedRoom          = order.cPreferedRoom !== undefined ? order.cPreferedRoom : ''
        this.cPreferedDate          = order.cPreferedDate !== undefined ? order.cPreferedDate : new Date(0)
        this.orderStatus            = order.orderStatus !== undefined ? order.orderStatus : OrderStatus.DEFAULT
        this.bindeedReservation     = order.bindeedReservation !== undefined ? order.bindeedReservation : 0
        this.orderSource            = order.orderSource !== undefined ? order.orderSource : ''
        this.responsibleEmloyee     = order.responsibleEmloyee !== undefined ? order.responsibleEmloyee : ''
        this.created_at             = order.created_at !== undefined ? order.created_at : new Date()
    }
}


export enum OrderStatus {
    DEFAULT
}