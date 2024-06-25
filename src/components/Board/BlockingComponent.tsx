import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";


export type BlockingComponentProps = {
    room: Room
    range: DateRange
}

export function BlockingComponent({room, range}: BlockingComponentProps) {
    const start = range.start
    const d = room.blocking
        ?.reduce<Array<{ span: number, offset: number }>>((acc, rb, i) => {
            const prev = acc[acc.length - 1]
            const prev_offset = prev?.offset + prev?.span || 0
            const offset = Math.ceil((rb.from.getTime() - start.getTime()) / 86_400_000)
            const span = rb.blockDays
            if (offset < prev_offset) {
                if (offset + span > prev_offset) {
                    prev.span = offset + span - prev.offset
                }
                return acc
            }
            acc.push({offset, span})
            return acc
        }, [])
    if (!d) return null

    console.log(d)
    return (
        <>
            {
                d.map(el => (
                    <div className='order service' style={{gridColumn: `${el.offset} / span ${el.span}`}}></div>
                ))
            }
        </>
    )
}

