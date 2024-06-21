import {Rooms} from "./Rooms";

export class Property{
    id: number
    name: string
    constructor(p: Property) {
        this.id = p.id
        this.name = p.name
    }

    get rooms(){
        return Rooms.instance.getRoomsByPropertyId(this.id)
    }
}