import {CustomerType} from "../../types/CustomerType";
import {Persons} from "./Persons";
import {Person} from "./Person";

export class Booking{
    id: number
    customer_id: Person["id"]
    customer_type: CustomerType

    private _customers: Persons

    constructor(b: Booking) {
        this.id = b.id
        this.customer_id = b.customer_id
        this.customer_type = b.customer_type

        this._customers = Persons.instance
    }

    get customer(){
        return this._customers.getById(this.customer_id)
    }
}