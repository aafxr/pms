import {RoomType} from "./RoomType";
import {Tariff} from "./Tariff";
import {Board} from "./Board";

export class RoomReserve{
    check_in_date?: Date
    check_out_date?: Date
    roomType_id: RoomType['id']
    tariff_id: Tariff['id']

    private _board: Board | undefined


    constructor(rr: Partial<RoomReserve> = {}, b?: Board) {
        this.check_in_date = rr.check_in_date !== undefined ? rr.check_in_date : undefined
        this.check_out_date = rr.check_out_date !== undefined ? rr.check_out_date : undefined
        this.roomType_id = rr.roomType_id !== undefined ? rr.roomType_id : -1
        this.tariff_id = rr.tariff_id !== undefined ? rr.tariff_id : -1
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