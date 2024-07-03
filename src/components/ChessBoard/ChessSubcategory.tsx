import React from 'react';

import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {DateRange} from "../../core/classes/v1/DateRange";
import {ChessBookingItem} from "./ChessBookingItem";
import {Room} from "../../core/classes/v1/Room";
import {ChessCell} from "./ChessCell";
import {useAppContext} from "../../contexts/AppContextProvider";


export type ChessSubcategoryPropsType = {
    open?: boolean
    range: DateRange
    room: Room
    onCellClick?: (value: Date | RoomBlockPeriod[]) => unknown
    onBookingClick?: (b: BookingItem) => unknown
}


export function ChessSubcategory({open = false, range, room, onBookingClick, onCellClick}: ChessSubcategoryPropsType) {
    const {appState: {bookingStatusFilter}} = useAppContext()

    const arr = Array.from({length: range.size})


    return (
        <div className='chess-subcategory'>
            <div className="chess-subcategory-name">{room.id}</div>
            <div className="chess-cells">
                {arr.map((_, i) => (<ChessCell
                    key={i}
                    room={room}
                    day={i}
                    range={range}
                    onCellClick={onCellClick}
                />))}
            </div>
            <div className='chess-bookings'>
                {room.booking
                    .filter(b => bookingStatusFilter ? b.status === bookingStatusFilter : true)
                    .map(b => <ChessBookingItem
                    key={b.id}
                    booking={b}
                    range={range}
                    onBookingClick={onBookingClick}
                />)}
            </div>
        </div>
    );
}

