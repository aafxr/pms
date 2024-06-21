import {Person} from "./Person";

export class Persons{
    private static _instance: Persons
    private persons: Map<Person['id'], Person>

    private constructor() {
        this.persons = new Map()
    }

    static get instance(){
        if(!this._instance){
            this._instance = new this()
        }
        return this._instance
    }

    add(p: Person){
        if (this.persons.has(p.id)) return
        this.persons.set(p.id, new Person(p))
    }

    getById(id: Person['id']){
        return this.persons.get(id)
    }

    count(){
        return this.persons.size
    }

    list(){
        return Array.from(this.persons.values())
    }

    clear(){
        this.persons.clear()
    }
}