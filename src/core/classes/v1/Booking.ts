import {CustomerType} from "../../types/CustomerType";
import {Person} from "./Person";
import {Board} from "./Board";

export class Booking{
    id: number
    customer_id: Person["id"]
    customer_type: CustomerType

    private _board: Board | undefined

    constructor(b: Partial<Booking> = {}, board?: Board) {
        this.id = b.id !== undefined ? b.id : -1
        this.customer_id = b.customer_id !== undefined ? b.customer_id : -1
        this.customer_type = b.customer_type !== undefined ? b.customer_type : 'individual_person'

        if (board) this.board = board
    }

    private _mountBoard(){
        if(this._board) {
            this._board.booking.set(this.id, this)
        }
    }

    private _unmountBoard(){
        if(this._board) {
            this._board.booking.delete(this.id)
        }
    }

    set board(b:Board){
        if(this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }

    get customer(){
        return this._board?.persons.get(this.customer_id)
    }
}