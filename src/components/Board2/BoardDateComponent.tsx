import React, {useEffect, useRef} from 'react';
import {DateRange} from "../../core/classes/v1/DateRange";


export interface BoardDateComponentPropsType {
    rang: DateRange
}

export function BoardDateComponent({rang}: BoardDateComponentPropsType) {
    return (
        <div className="date syncWheel">
            {Object.entries(rang.getMonths).map(([month, span], i) => (
                <div
                    key={i}
                    className="month boarder"
                    title={month}
                    style={{gridColumn: `span ${span}`}}
                    data-span={span}>
                    <span>{month}</span>
                </div>
            ))}
        </div>
    );
}

