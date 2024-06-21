import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";
import clsx from "clsx";


export interface RoomRowComponent{
    room: Room
    range: DateRange
}

export function RoomRowComponent({room, range}: RoomRowComponent) {

    return (
        <>
            <div className="room boarder">{room.id}</div>
            <div className="cells syncWheel">
                {Array.from({length: range.size}).map((_, i) => (
                    <div className={clsx("cell cell-room", {
                        reserved: (range.getDate(i) && room.isBlockDay(range.getDate(i)!))
                    })}></div>

                ))}
            </div>
        </>
    );
}

