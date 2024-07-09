import {FilterUnit} from "./FilterUnit";
import {BookingItem} from "../v1/BookingItem";

export class FilterByObjectType extends FilterUnit<BookingItem>{
    id: number;
    name: string;

    objectTypes: Set<BookingItem['object_type']>


    constructor(f: Partial<FilterByObjectType>) {
        super();
        this.id = f.id !== undefined ? f.id : -1
        this.name = f.name !== undefined ? f.name : ''
        this.objectTypes = f.objectTypes !== undefined ? f.objectTypes : new Set()
    }


    setObjectTypes(ot: BookingItem['object_type'][]){
        this.objectTypes.clear()
        ot.forEach(o => this.objectTypes.add(o))
    }




    check(v: BookingItem): boolean {
        if(this.objectTypes.has(v.object_type)) return true
        return false;
    }


}