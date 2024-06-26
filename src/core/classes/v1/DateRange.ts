export class DateRange {
    private _list: Date[]

    constructor(date: Date, days: number) {
        // date = new Date(date.getFullYear(),date.getMonth(),date.getDate(), 23,59,59,999)
        this._list = []
        for (let i = 0; i <= days; i++){
            const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            d.setDate(date.getDate() + i)
            this._list.push(d)
        }
    }

    get start(){
        return this._list[0]
    }

    get end(){
        return this._list[this._list.length - 1]
    }


    getDate(idx: number): Date | undefined{
        return this._list[idx]
    }

    get size(){
        return this._list.length
    }

    get getMonths(){
        return this._list.reduce<{[key: string]: number}>((a, c) => {
            const monthName = c.toLocaleDateString(navigator.language, {month: "long", year: "numeric"})
            if(a[monthName]){
                a[monthName] += 1
            } else {
                a[monthName] = 1
            }
            return a
        }, {})
    }

    isWeekend(idx: number){
        const d = new Date(this.start)
        d.setDate(d.getDate() + idx)
        const day = d.getDay()
        return day === 0 || day === 6;
    }
}



