import {RoomType} from "./RoomType";


/**
 * синглтон
 *
 * список комнат
 */
export class RoomTypes{
    private static _instance: RoomTypes

    private roomTypes: Map<RoomType['id'], RoomType>

    private constructor() {
        this.roomTypes = new Map()
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


    add(r: RoomType){
        if(this.roomTypes.has(r.id)) return
        this.roomTypes.set(r.id, new RoomType(r))
    }

    count(){
        return this.roomTypes.size
    }

    list(){
        return Array.from(this.roomTypes.values()).map(r => new RoomType(r))
    }
}