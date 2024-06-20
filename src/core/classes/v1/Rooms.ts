import {Room} from "./Room";

export class Rooms{
    private static _instance: Rooms

    private rooms: Map<Room['id'], Room>

    private constructor() {
        this.rooms = new Map()
    }


    static get instance(){
        if(!this._instance) {
            this._instance = new this()
        }
        return this._instance
    }

    getById(id: Room['id']){
        return this.rooms.get(id)
    }

    add(r:Room){
        if(this.rooms.has(r.id)) return
        this.rooms.set(r.id, new Room(r))
    }

    count(){
        return this.rooms.size
    }

    list(){
        return Array.from(this.rooms.values()).map(r => new Room(r))
    }
}