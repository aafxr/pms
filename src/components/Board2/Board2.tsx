import React, {useEffect, useRef, WheelEvent, useState} from 'react';
import {fetchRooms} from "../../api/fetchRooms";

import './Board2.scss'
import {Rooms} from "../../core/classes/v1/Rooms";
import {Properties} from "../../core/classes/v1/Properties";
import {RoomTypes} from "../../core/classes/v1/RoomTypes";
import {RoomBlockPeriods} from "../../core/classes/v1/RoomBlockPeriods";
import {Persons} from "../../core/classes/v1/Persons";
import {BookingItems} from "../../core/classes/v1/BookingItems";
import {Bookings} from "../../core/classes/v1/Bookings";


export interface Board2PropsType {
    onScrollToLeftSide?: () => unknown
    onScrollToRightSide?: () => unknown
}


const boardState = {
    rooms: Rooms.instance,
    properties: Properties.instance,
    roomTypes: RoomTypes.instance,
    blocking: RoomBlockPeriods.instance,
    persons: Persons.instance,
    bookingItems: BookingItems.instance,
    bookings: Bookings.instance,
}


function _Board2({onScrollToLeftSide, onScrollToRightSide}: Board2PropsType) {
    const boardRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<typeof boardState>(boardState)


    useEffect(() => {
        const d = new Date()
        fetchRooms({
            end_date: d,
            start_date: new Date(d.getFullYear() - 26, d.getMonth(), d.getDate())
        })
            .then(data => {
                if (!data) return
                // @ts-ignore
                window.data = data
                setState(data)
            })
            .catch(console.error)
    }, []);


    useEffect(() => {
        const bel = boardRef.current;
        if (!bel) return;

        const elements = bel.querySelectorAll(".month") as unknown as Array<HTMLDivElement>;
        elements.forEach(
            (el) => (el.style.gridColumn = `span ${el.dataset.span}`)
        );
    }, []);


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        const el = e.currentTarget;
        let scrollToLeftSide = false
        let scrollToRightSide = false

        el.querySelectorAll<HTMLDivElement>(".syncWheel")
            .forEach(el => {
                el.scrollBy({left: Number(e.deltaY)})
                if (e.deltaY < 0 && el.scrollLeft === 0) scrollToLeftSide = true
                else if (e.deltaY > 0 && el.scrollLeft >= el.scrollWidth - el.offsetWidth) scrollToRightSide = true
            })
        if (scrollToLeftSide) onScrollToLeftSide?.()
        if (scrollToRightSide) onScrollToRightSide?.()

    }


    const property = state.properties.list()[0]
    console.log(state)

    return (
        <div
            ref={boardRef}
            className="board"
            onWheel={handleWheel}
        >
            <div className="filter boarder">filter</div>
            <div className="header boarder">header</div>
            <div className="date syncWheel">
                <div className="month boarder" data-span="8">
                    <span>april</span>
                </div>
                <div className="month boarder" data-span="8">
                    <span>may</span>
                </div>
                <div className="month boarder" data-span="8">
                    <span>june</span>
                </div>
            </div>
            <div className="content">
                {property && state.roomTypes.getByPropertyID(property.id).map(roomType => (
                    <>
                        <div className="category boarder">{roomType.name}</div>
                        <div className="cells syncWheel">
                            {Array.from({length: 25}).map((_, i) => (
                                <div className="cell">{i+1}</div>

                            ))}
                        </div>
                        {state.rooms.getRoomsByRoomTypeId(roomType.id).map(room => (
                            <>
                                <div className="category boarder">{room.name} {room.id}</div>
                                <div className="cells syncWheel">
                                    {Array.from({length: 25}).map((_, i) => (
                                        <div className="cell">{i + 1}</div>

                                    ))}
                                </div>
                            </>
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
}


export const Board2 = Object.assign(_Board2, {})

