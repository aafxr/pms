import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";

export interface RoomNameCategoryPropsType{
    name: string
    rooms: Room[]
    range: DateRange
}

export function RoomNameCategory({name, rooms, range}: RoomNameCategoryPropsType) {
    return (
        <>
            <div className="category boarder" title={name}>{name.split('_').pop()}</div>
            <div className="cells syncWheel">
                {Array.from({length: range.size}).map((_, i) => (
                    <div className="cell cell-category">
                        {rooms.reduce((a, c) => (range.getDate(i) && c.isBlockDay(range.getDate(i)!)) ? a - 1 : a, rooms.length)}
                    </div>

                ))}
            </div>
        </>
    );
}

