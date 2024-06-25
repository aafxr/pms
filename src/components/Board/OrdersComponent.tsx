import React from 'react';
import {Room} from "../../core/classes/v1/Room";
import {DateRange} from "../../core/classes/v1/DateRange";

export type OrdersComponentPropsType ={
    room: Room
    range: DateRange
}

export function OrdersComponent({room, range}: OrdersComponentPropsType) {
    const bl = room.getBookingOffset(range.start)
    console.log(bl)

    return (
        <div className='order'></div>
    );
}
