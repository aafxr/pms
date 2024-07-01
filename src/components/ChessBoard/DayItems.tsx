import React from 'react';
import {DateRange} from "../../core/classes/v1/DateRange";


export type DayItemsPropsType = {
    range: DateRange
}


export function DayItems({range}: DayItemsPropsType) {
    const isDaily = range.strategy === 'daily'
    const items: { [key: string]: number } = {}

    for (let i = 0; i < range.size; i++) {
        const d = range.getDate(i)
        const key = isDaily
            ? d.toLocaleDateString(navigator.language, {month: "long", year: "numeric"})
            : d.toLocaleDateString(navigator.language, {month: "long", day: "numeric"})
        if (!items[key]) {
            items[key] = 1
            continue
        }

        items[key]++
    }

    return (
        <>
            {Object.entries(items).map(([name, count], i) => (
                <div
                    key={i}
                    className="chess-days-item"
                    title={name}
                    style={{
                        gridColumn: `span ${count}`
                    }}
                >
                    <span>{name}</span>
                </div>
            ))}
        </>
    )
}

