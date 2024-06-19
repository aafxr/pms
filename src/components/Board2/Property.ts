export type PropertyType = {
    id: number
    name: string
}

export class Property{
    id: number
    name: string

    constructor(property: Partial<Property> = {}) {
        this.id = property.id !== undefined ? property.id : 0
        this.name = property.name !== undefined ? property.name : ''
    }
}