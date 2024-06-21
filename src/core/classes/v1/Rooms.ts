import {Room} from "./Room";
import {Property} from "./Property";
import {Properties} from "./Properties";
import {RoomType} from "./RoomType";

export class Rooms{
    private static _instance: Rooms

    private rooms: Map<Room['id'], Room>
    private properties: Map<Property['id'], Map<Room['id'], Room>>
    private roomTypes: Map<RoomType['id'], Map<Room['id'], Room>>
    private roomName: Map<Room['name'], Map<Room['id'], Room>>



    private constructor() {
        this.rooms = new Map()
        this.properties = new Map()
        this.roomTypes = new Map()
        this.roomName = new Map()
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

    getRoomsByPropertyId(id: Property['id']){
        return Array.from(this.properties.get(id)?.values() || [])
    }

    getRoomsByRoomTypeId(id: Property['id']){
        return Array.from(this.roomTypes.get(id)?.values() || [])
    }

    getByRoomName(roomType: RoomType['id'],name: Room['name']){
        return Array.from(this.roomName.get(roomType + name)?.values() || [])
    }

    getRoomsNames(id: RoomType['id']){
        const key = '' + id
        const names = Array.from(this.roomName.keys()).filter(n => n.startsWith(key))
        const result: { [key: string] : Room[] } = {}
        for (const name of names){
            result[name] = Array.from(this.roomName.get(name)?.values() || [])
        }
        return result
    }

    add(r:Room){
        if(this.rooms.has(r.id)) return
        this.rooms.set(r.id, new Room(r))
        this.addByPropertyID(this.rooms.get(r.id)!)
        this.addByRoomTypeID(this.rooms.get(r.id)!)
        this.addByRoomName(this.rooms.get(r.id)!)
    }


    private addByPropertyID(r:Room){
        if(!this.properties.has(r.property_id)){
            this.properties.set(r.property_id, new Map())
        }
        this.properties.get(r.property_id)!.set(r.id, r)
    }

    private addByRoomTypeID(r:Room){
        if(!this.roomTypes.has(r.room_type_id)){
            this.roomTypes.set(r.room_type_id, new Map())
        }
        this.roomTypes.get(r.room_type_id)!.set(r.id, r)
    }

    private addByRoomName(r:Room){
        const key = r.room_type_id + '_' + r.name
        if(!this.roomName.has(key)){
            this.roomName.set(key, new Map())
        }
        this.roomName.get(key)!.set(r.id, r)
    }


    count(){
        return this.rooms.size
    }

    list(){
        return Array.from(this.rooms.values()).map(r => new Room(r))
    }

    clear(){
        this.rooms.clear()
        this.properties.clear()
        this.roomTypes.clear()
    }
}