export class DateRange {
    private _list: Date[]

    constructor(date: Date, days: number) {
        this._list = []


    }


    getDate(idx: number): Date | undefined{
        return this._list[idx]
    }

    get size(){
        return this._list.length
    }
}



