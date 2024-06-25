import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";
import {HumanIcon} from '../svg'

export type OrdersComponentPropsType ={
    room: Room
    range: DateRange
}

export function OrdersComponent({room, range}: OrdersComponentPropsType) {
    const bl = room.getBookingOffset(range.start)
    console.log(bl)

    return (
        <>
            {
                bl.map(b=> (
                    <div className='reserve' style={{gridColumn: `${b.offset} / span ${b.span}`}}>
                        <div className="order-booking">
                            {b.bockingList.map(bi => (
                                <div className='booking'>
                                    <div className='booking-item'>
                                        <div className='booking-stat'>
                                            <div className='booking-count'>
                                                <HumanIcon className='icon-16'/>
                                                <span>{bi.adults_count}</span>
                                                +
                                                <span>{bi.kids_count}</span>
                                                + {bi.id}
                                            </div>
                                            <div className='booking-price'>{bi.price}</div>
                                        </div>
                                        <div className='booking-person'>{bi.booking?.customer?.fullName}</div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                ))
            }
        </>
    )

}
