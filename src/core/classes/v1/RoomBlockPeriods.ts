import {Room} from "./Room";
import {RoomBlockPeriod} from "./RoomBlockPeriod";

export class RoomBlockPeriods {
    private static _instance: RoomBlockPeriods
    private blocks: Map<Room['id'], Map<RoomBlockPeriod['id'], RoomBlockPeriod>>

    private constructor() {
        this.blocks = new Map()
    }

    static get instance(){
        if(!this._instance){
            this._instance = new this()
        }
        return this._instance
    }

    add(rbp: RoomBlockPeriod) {
        if (!this.blocks.has(rbp.room_id)) {
            this.blocks.set(rbp.room_id, new Map())
        }

        if (this.blocks.get(rbp.room_id)!.has(rbp.id)) return

        this.blocks.get(rbp.room_id)!.set(rbp.id, new RoomBlockPeriod(rbp))
    }

    getBlockPeriods(room_id: Room['id']): RoomBlockPeriod[] {
        return Array.from(this.blocks.get(room_id)?.values() || [])
    }

    clear(){
        this.blocks.clear()
    }
}