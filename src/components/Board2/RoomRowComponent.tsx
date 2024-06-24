import React, {memo} from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";
import clsx from "clsx";
import {Booking} from "../../core/classes/v1/Booking";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";


export interface RoomRowComponent {
    room: Room
    range: DateRange
}

export function RoomRowComponent({room, range}: RoomRowComponent) {

    return (
        <>
            <div className="room boarder">{room.id}</div>
            <div className='reservations syncWheel'>
                <div className="cells">
                    {Array.from({length: range.size}).map((_, i) => (
                        <div key={range.getDate(i)?.getTime() || i} className={clsx("cell cell-room")}/>

                    ))}
                </div>
                <div className="orders">
                    {
                        room.blocking
                            .map(b => <Reservation key={b.id} block={b} range={range}/>)
                    }
                </div>

            </div>
        </>
    );
}


type ReservationPropsType = {
    block: RoomBlockPeriod
    range: DateRange
}

const  Reservation = memo(({block, range}: ReservationPropsType) => {
    const span = Math.ceil((block.to.getTime() - block.from.getTime()) / 86_400_000) + 1
    const offset = Math.floor((block.from.getTime() - range.getDate(0)!.getTime()) / 86_400_000) + 1



    return (
        <div className="order boarder"
             style={{gridColumn: `${offset} / span ${span}`}}>
            <div className="order-inner">
                inner
            </div>
        </div>
    )
})

