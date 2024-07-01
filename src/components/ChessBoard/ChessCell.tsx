import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import clsx from "clsx";
import {DateRange} from "../../core/classes/v1/DateRange";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";


export type ChessCellPropsType = {
    room: Room
    range: DateRange
    day: number
    onCellClick?: (value: Date | RoomBlockPeriod[]) => unknown
}


export function ChessCell({room, range, day, onCellClick}: ChessCellPropsType) {
    const blocks = room.isBlockDay(range.getDate(day))
    return (
        <div
            onClick={() => onCellClick?.(blocks.length ? blocks : range.getDate(day))}
            className={
                clsx("chess-cell",
                    {
                        weekend: range.isWeekend(day),
                        service: !!blocks.length
                    })
            }
        />
    );
}

