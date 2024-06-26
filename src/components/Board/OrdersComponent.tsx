import React, {MouseEvent} from 'react';

import {BookingItem} from "../../core/classes/v1/BookingItem";
import {DateRange} from "../../core/classes/v1/DateRange";
import {Room} from "../../core/classes/v1/Room";
import {HumanIcon} from '../svg'

export type OrdersComponentPropsType = {
    room: Room
    range: DateRange
    onOrderClick?: (b: BookingItem) => unknown
}

export function OrdersComponent({room, range, onOrderClick}: OrdersComponentPropsType) {
    const bl = room.getBookingOffset(range.start)
    console.log(bl)


    function handleOrderClick(e: MouseEvent<HTMLDivElement>, b: BookingItem){
        e.stopPropagation()
        onOrderClick?.(b)
    }


    return (
        <>
            {
                bl.map(b => (
                    <div
                        className='reserve'
                        style={{
                            gridColumn: `${b.offset} / span ${b.span}`,
                            gridRow: '1 span 1'
                        }}
                    >
                        <div
                            className="order-booking"
                            title={`booking_item_id: ${b.bocking.id}, ${b.bocking.booking?.customer?.fullName}`}
                            onClick={(e) => handleOrderClick(e, b.bocking)}
                        >
                            <div className='booking'>
                                <div className='booking-item' >
                                    <div className='booking-stat'>
                                        <div className='booking-count'>
                                            <HumanIcon className='icon-16'/>
                                            &nbsp;
                                            <span>{b.bocking.adults_count}</span>
                                            +
                                            <span>{b.bocking.kids_count}</span>
                                        </div>
                                        <div className='booking-price'>
                                            {b.bocking.price}
                                            &nbsp;
                                            <div className='booking-price-dot'/>
                                        </div>
                                    </div>
                                    <div className='booking-person'>{b.bocking.booking?.customer?.fullName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )

}
