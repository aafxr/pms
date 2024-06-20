import {Property} from "./Property";

export class Properties{
    private static _instance: Properties

    private properties: Map<Property['id'], Property>

    private constructor() {
        this.properties = new Map()
    }

    static get instance(){
        if(!this._instance){
            this._instance = new this()
        }
        return this._instance
    }

    getById(id: Property['id']){
        return this.properties.get(id)
    }

    add(p: Property){
        if(this.properties.has(p.id)) return
        this.properties.set(p.id, new Property(p.id, p.name))
    }

    count(){
        return this.properties.size
    }

    list(){
        return Array.from(this.properties.values()).map(p => new Property(p.id,p.name))
    }

}