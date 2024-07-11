import {Property} from "./Property";
import {ExtraServiceQtyType} from "../../types/ExtraServiceQtyType";
import {Board} from "./Board";

/** Сущность: "Дополнительная услуга" */
export class ExtraService{
    id: number
    /** Внешний ключ на сущность "Объект размещения" */
    property_id: Property['id']
    /** Название доп услуги */
    name: string
    /** Описание доп услуги */
    desc: string
    /** Стоимость доп услуги */
    price: number
    /** Валюта стоимости доп услуги */
    currency: string
    /** Единица измерения */
    qty_type: ExtraServiceQtyType

    private _board?: Board


    constructor(es : Partial<ExtraService> = {}, b?:Board) {
        this.id = es.id !== undefined ? es.id : -1
        this.property_id = es.property_id !== undefined ? es.property_id : -1
        this.name = es.name !== undefined ? es.name : ''
        this.desc = es.desc !== undefined ? es.desc : ''
        this.price = es.price !== undefined ? es.price : 0
        this.currency = es.currency !== undefined ? es.currency : ''
        this.qty_type = es.qty_type !== undefined ? es.qty_type : "pc"

        if(b) this.board = b
    }


    private _mountBoard(){
        if (!this._board) return
        this._board.extraServices.set(this.id, this)

    }


    private _unmountBoard(){
        if (!this._board) return
        this._board.extraServices.delete(this.id)
    }


    set board(b: Board){
        if (this._board) this._unmountBoard()
        this._board = b
        this._mountBoard()
    }
}