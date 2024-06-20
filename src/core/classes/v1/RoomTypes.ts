import {RoomType} from "./RoomType";
import {Property} from "./Property";


/**
 * синглтон
 *
 * список комнат
 */
export class RoomTypes{
    private static _instance: RoomTypes

    private roomTypes: Map<RoomType['id'], RoomType>
    private properties: Map<Property['id'], Map<RoomType['id'], RoomType>>

    private constructor() {
        this.roomTypes = new Map()
        this.properties = new Map()
    }

    static get instance(){
        if(!this._instance) {
            this._instance = new this()
        }
        return this._instance
    }


    getById(id: RoomType['id']){
        return this.roomTypes.get(id)
    }


    getByPropertyID(id: Property['id']){
        return Array.from(this.properties.get(id)?.values() || [])
    }


    add(r: RoomType){
        if(this.roomTypes.has(r.id)) return
        this.roomTypes.set(r.id, new RoomType(r))
        this.addByPropertyId(this.roomTypes.get(r.id)!)
    }

    private addByPropertyId(r: RoomType){
        if(!this.properties.has(r.property_id)){
            this.properties.set(r.property_id, new Map())
        }
        this.properties.get(r.property_id)!.set(r.id, r)
    }

    count(){
        return this.roomTypes.size
    }

    list(){
        return Array.from(this.roomTypes.values()).map(r => new RoomType(r))
    }
}