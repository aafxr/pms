import {CustomerType} from "../../types/CustomerType";
import {Person} from "./Person";
import {Board} from "./Board2";

export class Booking{
    id: number
    customer_id: Person["id"]
    customer_type: CustomerType

    private _board: Board

    constructor(board: Board, b: Booking) {
        this.id = b.id
        this.customer_id = b.customer_id
        this.customer_type = b.customer_type

        this._board = board
        this._board.booking.set(this.id, this)
    }

    get customer(){
        return this._board.persons.get(this.customer_id)
    }
}