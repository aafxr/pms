import React, {MouseEvent} from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";


export type BlockingComponentProps = {
    room: Room
    range: DateRange
    onRoomBlockingClick?: (b: RoomBlockPeriod) => unknown
}

export function BlockingComponent({
                                      room,
                                      range,
                                      onRoomBlockingClick
                                  }: BlockingComponentProps) {
    const start = range.start
    const d = room.getBlockingPeriods(range.start)


    function handleBlockingClick(e: MouseEvent<HTMLDivElement>, b: RoomBlockPeriod){
        e.stopPropagation()
        onRoomBlockingClick?.(b)
    }


    return (
        <>
            {
                d.map(el => (
                    <div
                        className='service'
                        onClick={e => handleBlockingClick(e, el.blocking)}
                        style={{
                            gridColumn: `${el.offset} / span ${el.span}`,
                            gridRow: '1 / span 1'
                        }}
                    />
                ))
            }
        </>
    )
}

