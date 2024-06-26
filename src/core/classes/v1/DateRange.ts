export class DateRange {
    private _date: Date
    private _days: number

    constructor(date: Date, days: number) {
        // date = new Date(date.getFullYear(),date.getMonth(),date.getDate(), 23,59,59,999)
        this._date = new Date(date)
        this._days = days
    }

    get start(){
        return new Date(this._date)
    }

    get end(){
        const d = this.start
        d.setDate(d.getDate() + this._days)
        return d
    }


    getDate(idx: number): Date{
        const d = this.start
        d.setDate(d.getDate() + idx)
        return d
    }

    get size(){
        return this._days
    }

    get getMonths() {
        const result: { [key: string]: number } = {}
        for (let i = 0; i < this._days; i++) {
            const monthName = this.getDate(i).toLocaleDateString(navigator.language, {month: "long", year: "numeric"})
            if (result[monthName]) {
                result[monthName] += 1
            } else {
                result[monthName] = 1
            }
        }
        return result
    }

    isWeekend(idx: number){
        const day = this.getDate(idx).getDay()
        return day === 0 || day === 6;
    }
}



