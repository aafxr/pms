import React, {useEffect, useRef, WheelEvent, useState} from 'react';
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

import {BoardContext} from './BoardContext/BoardContext'
import './Board2.scss'
import {Button, ButtonsGroup} from "../buttons";
import {Row} from "../flex";
import {CategoryComponent} from "./CategoryComponent";
import {DateRange} from "../../core/classes/v1/DateRange";
import {RoomNameCategory} from "./RoomNameCategory";
import {RoomRowComponent} from "./RoomRowComponent";
import {BoardDateComponent} from "./BoardDateComponent";


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

    const d = new Date()
    const range = new DateRange()
        //Array.from({length: days}).map((_, i, arr) => new Date().setDate(d.getDate() - (arr.length / 2 + i)))


    useEffect(() => {
        const el = boardRef.current
        if (!el) return
        const width = el.querySelector<HTMLDivElement>('.cells')?.offsetWidth || 0
        setDays(Math.floor(width / 60))
    }, []);


    useEffect(() => {
        const d = new Date()
        fetchRooms({
            end_date: d,
            start_date: new Date(d.getFullYear() - 2, d.getMonth(), d.getDate())
        })
            .then(data => {
                if (!data) return
                // @ts-ignore
                window.data = data
                const {
                    rooms,
                    properties,
                    booking_items,
                    individual_persons,
                    room_types,
                    legal_entities,
                    room_block_periods
                } = data

                const board = new Board(true)
                rooms.rooms.forEach(r => board.add(new Room(r)))
                properties.forEach(p => board.add(new Property(p)))
                booking_items.forEach(bi => board.add(new BookingItem(bi)))
                individual_persons.forEach(p => board.add(new Person(p)))
                room_types.forEach(rt => board.add(new RoomType(rt)))
                room_block_periods.forEach(rbp => board.add(new RoomBlockPeriod(rbp)))

                // @ts-ignore
                window.board = board


                setBoard(board)
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


    const property = board.getProperties()[0]
    console.log(board)

    return (
        <BoardContext.Provider value={board}>

            <div
                ref={boardRef}
                className="board"
                onWheel={handleWheel}
            >
                <div className='filter'>
                    <ButtonsGroup select={1} buttons={groupButtons}/>
                    <Row className='info'>
                        <Button className='filter-month'><span>Октябрь, 2024</span></Button>
                        <Button className='filter-day'><span>Сегодня</span></Button>
                    </Row>
                </div>
                <div className="header boarder">{property.name}</div>
                <BoardDateComponent rang={range} />
                <div className="content">
                    {property && board.getPropertyRoomTypes(property.id).map(roomType => (
                        <>
                            <CategoryComponent roomType={roomType} range={range} />
                            {Object.entries(roomType.roomsByName).map(([name, rooms]) => (
                                <>
                                    <RoomNameCategory rooms={rooms} name={name.split('_').pop() || ''} range={range} />
                                    {rooms.map(room => (
                                        <RoomRowComponent range={range} room={room} />
                                    ))}
                                </>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </BoardContext.Provider>
    );
}


export const Board2 = Object.assign(_Board2, {})

