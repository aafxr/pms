import {BookingTimeStrategyType} from "../../types/BookingTimeStrategyType";

export class DateRange {
    private _date: Date
    private _size: number
    private _strategy: BookingTimeStrategyType

    constructor(date: Date, size: number, strategy: BookingTimeStrategyType = 'daily') {
        // date = new Date(date.getFullYear(),date.getMonth(),date.getDate(), 23,59,59,999)
        this._date = new Date(date)
        this._size = size
        this._strategy = strategy
    }

    get strategy() {
        return this._strategy
    }

    set strategy(strategy: BookingTimeStrategyType) {
        if(strategy === 'daily' || strategy === 'hourly') {
            this._strategy = strategy
        }
    }

    get start() {
        return new Date(this._date)
    }

    get end() {
        return this.getStep(this._size)
    }

    getStep(idx: number) {
        // if(idx < 0 ) debugger
        const d = this.start
        if (this._strategy === "daily") {
            d.setDate(d.getDate() + idx)
        } else {
            let day = Math.floor(idx / 24)
            if(idx < 0) day += 1
            const hours = idx % 24
            d.setDate(d.getDate() + day)
            d.setHours(d.getHours() + hours)
        }
        return d
    }


    getDate(idx: number): Date {
        return this.getStep(idx)
    }

    get size() {
        return this._size
    }

    set size(s: number) {
        if (s >= 0) {
            this._size = s
        }
    }

    getMonths() {
        const result: { [key: string]: number } = {}
        for (let i = 0; i < this._size; i++) {
            const monthName = this.getDate(i).toLocaleDateString(navigator.language, {month: "long", year: "numeric"})
            if (result[monthName]) {
                result[monthName] += 1
            } else {
                result[monthName] = 1
            }
        }
        return result
    }

    getDays(){
        const result: { [key: string]: number } = {}
        for (let i = 0; i < this._size; i++) {
            const monthName = this.getDate(i).toLocaleDateString(navigator.language, {day: "numeric", month: "long"})
            if (result[monthName]) {
                result[monthName] += 1
            } else {
                result[monthName] = 1
            }
        }
        return result
    }

    isWeekend(idx: number) {
        const day = this.getDate(idx).getDay()
        return day === 0 || day === 6;
    }

    [Symbol.iterator]() {
        let idx = 0
        return {
            next: () => {
                return idx === this._size
                    ? {value: undefined, done: true}
                    : {value: this.getStep(idx++), done: false}
            }
        }
    }
}



