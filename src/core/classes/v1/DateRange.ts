export class DateRange {
    private _list: Date[]

    constructor(date: Date, days: number) {
        this._list = []
        for (let i = 0; i < days; i++){
            const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            d.setDate(d.getDate() + i)
            this._list.push(d)
        }
    }


    getDate(idx: number): Date | undefined{
        return this._list[idx]
    }

    get size(){
        return this._list.length
    }

    get getMonths(){
        return this._list.reduce<{[key: string]: number}>((a, c) => {
            const monthName = c.toLocaleDateString(navigator.language, {month: "long"})
            if(a[monthName]){
                a[monthName] += 1
            } else {
                a[monthName] = 1
            }
            return a
        }, {})
    }
}



