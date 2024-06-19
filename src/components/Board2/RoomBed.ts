import {BedGlossary} from "./BedGlossary";

export type RoomBedType={
    id: number
    /** количество спальных мест */
    count: number
    is_main: boolean
    room_bed_id: number
    room_type_id: number
    room_bed?: BedGlossary
}


/** спальное место в комнате */
export class RoomBed{
    id: number
    /** является ли дополнительным */
    is_main: boolean
    room_bed: BedGlossary
    room_bed_id: number
    room_type_id: number

    constructor(roomBed: Partial<RoomBed> = {}) {
        this.id = roomBed.id !== undefined ? roomBed.id : 0
        this.is_main = roomBed.is_main !== undefined ? roomBed.is_main : false
        this.room_bed = roomBed.room_bed !== undefined ? roomBed.room_bed : new BedGlossary()
        this.room_bed_id = roomBed.room_bed_id !== undefined ? roomBed.room_bed_id : 0
        this.room_type_id = roomBed.room_type_id !== undefined ? roomBed.room_type_id : 0
    }
}


