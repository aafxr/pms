import React from 'react';
import {DateRange} from "../../core/classes/v1/DateRange";


export interface BoardDateComponentPropsType{
    rang: DateRange
}

export function BoardDateComponent({rang}: BoardDateComponentPropsType) {
    return (
        <div className="date syncWheel">
            <div className="month boarder" data-span="8">
                <span>april</span>
            </div>
            <div className="month boarder" data-span="8">
                <span>may</span>
            </div>
            <div className="month boarder" data-span="8">
                <span>june</span>
            </div>
        </div>
    );
}

