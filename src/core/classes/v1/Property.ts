import {RoomBlockPeriod} from "./RoomBlockPeriod";
import {RoomType} from "./RoomType";
import {Board} from "./Board";
import {Room} from "./Room";

export class Property{
    id: number
    name: string

    private _board?: Board

    constructor(p: Partial<Property> = {}, b?: Board) {
        this.id = p.id !== undefined ? p.id : -1
        this.name = p.name !== undefined ? p.name : ''


        if(b) this.board = b

    }

    private _mountBoard(){
        if (!this._board) return
        this._board.properties.set(this.id, this)
    }


    private _unmountBoard(){
        if (!this._board) return
        this._board.properties.delete(this.id)
    }


    set board(b: Board){
        if (this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }

    addBlocking(b:RoomBlockPeriod){
        if(!this._board){
            console.error(new Error(`try to use method Property.addBlocking while _board not set`))
            return
        }
        if(!this._board.blocking.has(b.room_id)) this._board.blocking.set(b.room_id, new Map())
        this._board.blocking.get(b.room_id)!.set(b.id,b)
    }

    getBlocking(roomId: Room['id']){
        return this._board?.blocking.get(roomId) || []
    }

    getRooms(): Room[]{
        if(!this._board) return []
        return Array.from(this._board.rooms.values())
            .filter(r => r.property_id === this.id)
    }

    getRoomTypes(): RoomType[]{
        if(!this._board) return []
        return Array.from(this._board.roomTypes.values())
            .filter(c => c.property_id === this.id)
    }

    getRoomsByCategory(categoryId: RoomType['id']){
        return this.getRooms().filter(r => r.room_type_id === categoryId)
    }
}