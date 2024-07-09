export interface IValid<T extends {}>{
    validate(): Partial<Record<keyof T, string>>
}