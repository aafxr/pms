import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";


export interface RoomRowComponent{
    room: Room
    range: DateRange
}

export function RoomRowComponent({room, range}: RoomRowComponent) {
    return (
        <>
            <div className="room boarder">{room.id}</div>
            <div className="cells syncWheel">
                {Array.from({length: 25}).map((_, i) => (
                    <div className="cell cell-room"></div>

                ))}
            </div>
        </>
    );
}

