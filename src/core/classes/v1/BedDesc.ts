import {BedTypes} from "./BedTypes";

export class BedDesc {
    id: number
    name: string
    places: number

    constructor(b: BedDesc) {
        this.id = b.id
        this.name = b.name
        this.places = b.places
    }
}