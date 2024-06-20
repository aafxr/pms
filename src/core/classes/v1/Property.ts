import {Rooms} from "./Rooms";

export class Property{
    constructor(
        public id = -1,
        public name = ''
    ) {}

    get rooms(){
        return Rooms.instance.getRoomsByPropertyId(this.id)
    }
}