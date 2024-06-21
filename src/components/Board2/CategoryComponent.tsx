import React from 'react';
import {RoomType} from "../../core/classes/v1/RoomType";
import {DateRange} from "../../core/classes/v1/DateRange";

export interface CategoryComponent{
    roomType: RoomType
    range: DateRange
}

export function CategoryComponent({roomType, range}: CategoryComponent) {
    return (
        <>
            <div className="category boarder" title={roomType.name}>{roomType.name}</div>
            <div className="cells syncWheel">
                {Array.from({length: range.size}).map((_, i) => (
                    <div key={range.getDate(i)?.getTime() || i} className="cell cell-category">{range.getDate(i)?.getDate()}</div>

                ))}
            </div>
        </>
    );
}

