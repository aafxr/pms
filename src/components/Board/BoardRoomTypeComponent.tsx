import React, {Fragment, useState} from 'react';
import clsx from "clsx";

import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {RoomType} from "../../core/classes/v1/RoomType";
import {BlockingComponent} from "./BlockingComponent";
import {OrdersComponent} from "./OrdersComponent";
import {ChevronIcon} from "../svg";


export type BoardRoomTypeComponentPropsType = {
    property: Property
    roomType: RoomType
    range: DateRange
    strategy: BookingTimeStrategyType
    onRoomBlockingClick?: (b: RoomBlockPeriod) => unknown
    onOrderClick?: (b: BookingItem) => unknown
    onCellClick?: (d: Date) => unknown
}

export function BoardRoomTypeComponent({
                                           roomType,
                                           range,
                                           property,
                                           strategy,
                                           onOrderClick,
                                           onRoomBlockingClick,
                                           onCellClick
                                       }: BoardRoomTypeComponentPropsType) {
    const [isOpen, setIsOpen] = useState(false)


    function handleRoomTypeClick() {
        setIsOpen(!isOpen)
    }


    return (
        <>

            <div
                className="category"
                onClick={handleRoomTypeClick}
            >
                <div className='category-inner' title={roomType.name}>
                    <ChevronIcon className={clsx('category-image icon-16', {open: isOpen})}/>
                    <span>{roomType.name}</span>
                </div>
            </div>
            <div className="category-row">
                <div className="cells">
                    {Array.from({length: range.size})
                        .map((_, i) => (
                            <div
                                key={range.getDate(i)?.getTime() || i}
                                className={clsx("cell", {weekend: range.isWeekend(i)})}
                            >
                                {property.getRoomsByCategory(roomType.id).length}
                            </div>
                        ))
                    }
                </div>
            </div>

            {isOpen && property.getRoomsByCategory(roomType.id)
                .map(r => (
                    <Fragment key={r.id}>
                        <div className="room-category">
                            <div className='room-category-inner' title={`${r.name}, room_id: ${r.id}`}>
                                <div>{r.name}</div>
                                <div>{r.id}</div>
                            </div>
                        </div>
                        <div className="room-category-row">
                            <div className="cells">
                                {Array.from({length: range.size})
                                    .map((_, i) => (
                                        <div
                                            key={range.getDate(i)?.getTime() || i}
                                            className={clsx("cell", {weekend: range.isWeekend(i)})}
                                            onClick={() => onCellClick?.(range.getDate(i)!)}
                                        />
                                    ))
                                }
                            </div>
                            <div className='services'>
                                <BlockingComponent
                                    key={r.id}
                                    room={r}
                                    range={range}
                                    strategy={strategy}
                                    onRoomBlockingClick={onRoomBlockingClick}
                                />
                            </div>
                            <div className='reserves'>
                                <OrdersComponent
                                    key={r.id}
                                    room={r}
                                    range={range}
                                    strategy={strategy}
                                    onOrderClick={onOrderClick}
                                />
                            </div>
                        </div>
                    </Fragment>
                ))
            }
        </>
    );
}
