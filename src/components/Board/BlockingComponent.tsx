import React, {MouseEvent} from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";


export type BlockingComponentProps = {
    room: Room
    range: DateRange
    strategy: BookingTimeStrategyType
    onRoomBlockingClick?: (b: RoomBlockPeriod) => unknown
}

export function BlockingComponent({
                                      room,
                                      range,
                                      strategy,
                                      onRoomBlockingClick
                                  }: BlockingComponentProps) {
    const d = room.getBlockingPeriods(range.start, strategy)


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

