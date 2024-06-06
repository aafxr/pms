export interface IFieldsCheck {
    checkFields: () => FieldsCheckResult
}


export class FieldsCheckResult{
    constructor(public ok: boolean = true, public message: string = '') {
    }
}