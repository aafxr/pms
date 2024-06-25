import {Board} from "./Board";

export class BedDesc {
    id: number
    name: string
    places: number

    private _board: Board

    constructor(board: Board, b: BedDesc) {
        this.id = b.id
        this.name = b.name
        this.places = b.places

        this._board = board
        this._board.bedTypes.set(this.id, this)
    }
}