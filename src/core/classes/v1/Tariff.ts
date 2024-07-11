import {Board} from "./Board";

export class Tariff{
    id: number
    name: string

    private _board: Board | undefined

    constructor(t: Partial<Tariff> = {}, board?: Board) {
        this.id = t.id !== undefined ? t.id : -1
        this.name = t.name !== undefined ? t.name : ''
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
}