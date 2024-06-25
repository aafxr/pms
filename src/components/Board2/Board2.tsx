import React, {useEffect, useRef, WheelEvent, MouseEvent, useState, Fragment} from 'react';
import {fetchRooms} from "../../api/fetchRooms";

import {RoomBlockPeriods} from "../../core/classes/v1/RoomBlockPeriods";
import {BookingItems} from "../../core/classes/v1/BookingItems";
import {Properties} from "../../core/classes/v1/Properties";
import {RoomTypes} from "../../core/classes/v1/RoomTypes";
import {Bookings} from "../../core/classes/v1/Bookings";
import {Persons} from "../../core/classes/v1/Persons";
import {Rooms} from "../../core/classes/v1/Rooms";
import {Board} from "../../core/classes/v1/Board";

import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Property} from "../../core/classes/v1/Property";
import {RoomType} from "../../core/classes/v1/RoomType";
import {Person} from "../../core/classes/v1/Person";
import {Room} from "../../core/classes/v1/Room";

import {PropertiesService} from "../../core/classes/services/PropertiesService";
import {DateRange} from "../../core/classes/v1/DateRange";
import {BoardDateComponent} from "./BoardDateComponent";
import {BoardContext} from './BoardContext/BoardContext'
import {CategoryComponent} from "./CategoryComponent";
import {RoomNameCategory} from "./RoomNameCategory";
import {RoomRowComponent} from "./RoomRowComponent";
import {Button, ButtonsGroup} from "../buttons";
import {Row} from "../flex";

import './Board2.scss'


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


const groupButtons = [
    {id: 1, name: 'Сутки'},
    {id: 2, name: 'Час'}
]


function _Board2({onScrollToLeftSide, onScrollToRightSide}: Board2PropsType) {
    const boardRef = useRef<HTMLDivElement>(null);
    const [board, setBoard] = useState(new Board())
    const [days, setDays] = useState(0)

    const d = new Date()//Date.now() - 1000 * 60 * 60 * 24 * 250
    const range = new DateRange(new Date(), 100)
    //Array.from({length: days}).map((_, i, arr) => new Date().setDate(d.getDate() - (arr.length / 2 + i)))

    console.log(range)

    useEffect(() => {
        const el = boardRef.current
        if (!el) return
        const width = el.querySelector<HTMLDivElement>('.cells')?.offsetWidth || 0
        setDays(Math.floor(width / 60))
    }, []);


    useEffect(() => {
        const d = new Date()
        PropertiesService.getProperties({
            end_date: d,
            start_date: new Date(2024,4,1)
        })
            .then(b => {
                if (b){
                    console.log(b)
                }
            })
            .catch(console.error)
    }, []);


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()

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


    function preventScroll(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        e.preventDefault()
    }


    const property = board.getProperties()[0]
    console.log(board)

    return (
        <BoardContext.Provider value={board}>

            <div
                ref={boardRef}
                className="board"
                onWheel={handleWheel}
                onScroll={preventScroll}
            >
                <div className='filter'>
                    <ButtonsGroup select={1} buttons={groupButtons}/>
                    <Row className='info'>
                        <Button className='filter-month'><span>Октябрь, 2024</span></Button>
                        <Button className='filter-day'><span>Сегодня</span></Button>
                    </Row>
                </div>
                <div className="header boarder">{property?.name}</div>
                <BoardDateComponent rang={range}/>
                {property && board.getPropertyRoomTypes(property.id).map(roomType => (
                    <Fragment key={roomType.id}>
                        <CategoryComponent roomType={roomType} range={range}/>
                        {Object.entries(roomType.roomsByName).map(([name, rooms]) => (
                            <>
                                <RoomNameCategory rooms={rooms} name={name.split('_').pop() || ''} range={range}/>
                                {rooms.map(room => (
                                    <RoomRowComponent range={range} room={room}/>
                                ))}
                            </>
                        ))}
                    </Fragment>
                ))}
            </div>
        </BoardContext.Provider>
    );
}


export const Board2 = Object.assign(_Board2, {})

