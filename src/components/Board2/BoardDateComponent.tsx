import React, {useEffect, useRef} from 'react';
import {DateRange} from "../../core/classes/v1/DateRange";


export interface BoardDateComponentPropsType{
    rang: DateRange
}

export function BoardDateComponent({rang}: BoardDateComponentPropsType) {
    const dateRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const el = dateRef.current
        if(!el) return
        el.querySelectorAll<HTMLDivElement>('.month').forEach(el => {
            el.style.gridColumn = `span ${el.dataset.span}`
        })
    }, []);


    return (
        <div ref={dateRef} className="date syncWheel">
            {Object.entries(rang.getMonths).map(([month, span], i) => (
                <div key={i} className="month boarder" title={month} data-span={span}>
                    <span>{month}</span>
                </div>
            ))}
        </div>
    );
}

