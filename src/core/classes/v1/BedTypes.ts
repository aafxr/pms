import {BedDesc} from "./BedDesc";

/**
 * содержит коллекцию типов комнат
 */
export class BedTypes {
    private static _instance: BedTypes
    private beds: Map<BedDesc['id'], BedDesc>

    private constructor() {
        this.beds = new Map()
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new this()
        }
        return this._instance
    }

    getById(id: BedDesc['id']) {
        return this.beds.get(id)
    }


    add(b: BedDesc) {
        if (this.beds.has(b.id)) return
        this.beds.set(b.id, new BedDesc(b))
    }


    count() {
        return this.beds.size
    }

    list() {
        return Array.from(this.beds.values()).map(b => new BedDesc(b))
    }
}