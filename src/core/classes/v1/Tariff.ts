import {Board} from "./Board";
import {RoomType} from "./RoomType";
import {ExtraService} from "./ExtraService";

export class Tariff{
    id: number
    name: string
    description: string
    roomTypes_ids: RoomType['id'][]
    extraServices_ids: ExtraService['id'][]

    private _board: Board | undefined

    constructor(t: Partial<Tariff> = {}, board?: Board) {
        this.id = t.id !== undefined ? t.id : -1
        this.name = t.name !== undefined ? t.name : ''
        this.description = t.description !== undefined ? t.description : ''

        this.roomTypes_ids = t.roomTypes_ids !== undefined ? t.roomTypes_ids : []
        this.extraServices_ids = t.extraServices_ids !== undefined ? t.extraServices_ids : []

        if(board) this.board = board
    }

    private _mountBoard(){
        if (!this._board) return

    }


    private _unmountBoard(){
        if (!this._board) return

    }


    set board(b: Board){
        if (this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }

    unmount(){
        this._unmountBoard()
        this._board = undefined
    }
}