import React from 'react';
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {DateRange} from "../../core/classes/v1/DateRange";
import {HumanIcon} from "../svg";

export type ChessBookingItemPropsType = {
    booking: BookingItem
    range: DateRange
    onBookingClick?: (b: BookingItem) => unknown
}


export function ChessBookingItem({booking, range, onBookingClick}: ChessBookingItemPropsType) {
    const date = range.start

    if (booking.checked_out_at && booking.checked_out_at.getTime() < date.getTime()) return null

    const isHourly = range.strategy === 'hourly'
    const divider = !isHourly ? 86_400_000 : 3_600_000
    let offset
    let span = booking.checked_out_at ? Math.ceil((booking.checked_out_at.getTime() - date.getTime()) / divider) : -1//booking.daysCount
    const coef = isHourly ? booking.daysCount * 24 : booking.daysCount
    span = Math.min(span, coef)

    if (span > 0) {
        offset = booking.checked_in_at ? Math.ceil(((booking.checked_in_at.getTime() - date.getTime()) || 1) / divider) : -1
        offset = Math.max(1, offset)

    }

    if (!offset || span <= 0) return <></>


    return (
        <div
            className='chess-booking'
            style={{gridColumn: `${offset} / span ${span}`}}
            onClick={() => onBookingClick?.(booking)}
        >
            <div className='booking'>
                <div className='booking-content'>

                    <div className='booking-stat'>
                        <div className='booking-persons'>
                            <HumanIcon className='booking-icon icon-16'/>&nbsp;
                            {booking.adults_count}+{booking.kids_count}
                        </div>
                        <div className='booking-price'>
                            {booking.price}
                            <div className='booking-dot'/>
                        </div>
                    </div>
                    <div className='booking-person'>{booking.booking?.customer?.fullName}</div>
                </div>

            </div>
        </div>
    );
}

