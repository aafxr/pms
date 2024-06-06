import {EmployeeRules} from "./settings/EmployeeRules";

export class Employee {
    email: string;

    /** должность */
    status: string

    /**
     * Редактируемое
     * Обязательное
     *
     * Выбор из стандартных ролей: менеджер и оператор
     */
    role: EmployeeRole

    /**
     * Расширенные права
     *
     * Редактируемое
     */
    rules: EmployeeRules

    /**
     * Не редактируемое
     *
     * Выводится из профиля пользователя
     */

    photo: unknown

    /**
     * Редактируемое
     * Обязательное
     */
    phoneNumber: string

    /**
     * Не редактируемое
     * Выводится из профиля пользователя
     */
    firstName: string

    /**
     * Не редактируемое
     * Выводится из профиля пользователя
     */
    secondName: string

    /**
     * Не редактируемое
     * Выводится из профиля пользователя
     */
    lastName: string

    constructor(options: Partial<Employee> = {}) {
        this.email = options.email !== undefined ? options.email : ''
        this.status = options.status !== undefined ? options.status : ''
        this.role = options.role !== undefined ? options.role : EmployeeRole.DEFAULT
        this.rules = options.rules !== undefined ? options.rules : new EmployeeRules()
        this.photo = options.photo !== undefined ? options.photo : ''
        this.phoneNumber = options.phoneNumber !== undefined ? options.phoneNumber : ''
        this.firstName = options.firstName !== undefined ? options.firstName : ''
        this.secondName = options.secondName !== undefined ? options.secondName : ''
        this.lastName = options.lastName !== undefined ? options.lastName : ''
    }
}


export enum EmployeeRole {
    OPERATOR,
    MANAGER,
    DEFAULT
}