export abstract class FilterUnit<T extends {}> {
    abstract id: number
    /** describe what prop this filter check */
    abstract name: string


    abstract check(v: T): boolean
}