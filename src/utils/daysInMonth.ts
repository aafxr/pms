export function daysInMonth(d: Date){
    return new Date(d.getFullYear(), d.getMonth(), 0).getDate()
}