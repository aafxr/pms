import {Board} from "./Board";

export class BedDesc {
    id: number
    name: string
    places: number

    private _board: Board | undefined

    constructor(b: Partial<BedDesc> = {}, board?: Board) {
        this.id = b.id !== undefined ? b.id : -1
        this.name = b.name !== undefined ? b.name : ''
        this.places = b.places !== undefined ? b.places : -1

        if(board) this.board = board
    }


    private _mountBoard(){
        if (!this._board) return
        this._board.bedTypes.set(this.id, this)
    }


    private _unmountBoard(){
        if (!this._board) return
        this._board.bedTypes.delete(this.id)
    }


    set board(b: Board){
        if (this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }
}