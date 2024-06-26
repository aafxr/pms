import React, {Fragment, useEffect, useRef, useState, WheelEvent, MouseEvent} from 'react';

import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {Board} from "../../core/classes/v1/Board";

import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import NavButtons from "../buttons/NavButtons/NavButtons";
import {BlockingComponent} from "./BlockingComponent";
import {OrdersComponent} from "./OrdersComponent";
import {Button} from "../buttons";
import {Row} from "../flex";

import './ChessBoard.scss'
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import clsx from "clsx";


export interface ChessBoardPropsType {
    board: Board
    property: Property
    onBookingItemClick?: (b: BookingItem) => unknown
    onCellClick?: (date: Date) => unknown
    onBlockingClick?: (b: RoomBlockPeriod) => unknown
    onPrev?: () => unknown
    onNext?: () => unknown
    onRangeChange?: (range: DateRange) => unknown
}


export function ChessBoard({
                               board,
                               property,
                               onBlockingClick,
                               onCellClick,
                               onBookingItemClick,
                               onPrev,
                               onNext,
                               onRangeChange
                           }: ChessBoardPropsType) {
    const boardRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState<DateRange>(new DateRange(new Date(), 20))



    useEffect(() => {
        calcDateRange()
        window.addEventListener('resize', calcDateRange)
        return () => {window.removeEventListener('resize', calcDateRange)}
    }, []);


    function calcDateRange(){
        const b = boardRef.current
        if(!b) return
        const filter = b.querySelector<HTMLDivElement>('.filter')
        if(!filter) return

        const cs = window.getComputedStyle(b)
        const width =
            parseInt(cs.getPropertyValue('--b-cell-wz'))
            + parseInt(cs.getPropertyValue('--bgap'))

        const cellsCount = Math.floor((b.offsetWidth - filter.offsetWidth) / width)
        const d = new Date()
        setRange(new DateRange(d, cellsCount))
    }


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        let r: DateRange | undefined
        const k = 3
        if( e.deltaY > 0){
            const d = range.getDate(k)
            if (d) {
                r = new DateRange(d, range.size)
            }
        } else{
            const d = range.start
            if (d) {
                d.setDate(d.getDate() - k)
                r = new DateRange(d, range.size)
            }
        }
        if(r) {
            setRange(r)
            onRangeChange?.(r)
        }
    }

    function handleScroll(e: MouseEvent<HTMLDivElement>) {

    }


    function handleClickToday(){
        const r = new DateRange(new Date(), range.size)
        setRange(r)
    }

    function handleMonthClick(){
        const s = range.start
        const d = new Date(s.getFullYear(), s.getMonth())
        const r = new DateRange(d, range.size)
        setRange(r)
        onRangeChange?.(r)
    }


    return (
        <div
            ref={boardRef}
            className='board'
            onWheel={handleWheel}
            onScroll={handleScroll}
        >

            <div className="filter">
                <Row full>
                    <Button variant={"cancel"} className="daily">Сутки</Button>
                    <Button variant={"regular"} className="hourly">Час</Button>

                </Row>
                <Row className='filter-date-select' full>
                    <Button
                        variant={"cancel"}
                        className="month-btn"
                        onClick={handleMonthClick}
                        title={range.start.toLocaleDateString(navigator.language, {month: "long", year: "numeric"})}
                    >
                        {range.start.toLocaleDateString(navigator.language, {month: "long", year: "numeric"})}
                    </Button>
                    <Button
                        variant={"cancel"}
                        className="today-btn"
                        onClick={handleClickToday}
                    >
                        Сегодня
                    </Button>
                </Row>
            </div>

            <div className="property">
                <span>{property.name}</span>
            </div>

            <div className="date">
                {Object.entries(range.getMonths)
                    .map(([name, days]) => (
                        <div key={name} className='date-month' style={{gridColumn: `span ${days}`}}>
                            <span>{name}</span>
                        </div>
                    ))}
            </div>

            <div className="category">
                <div className='category-inner'>Категории</div>
            </div>
            <div className="category-row daily">
                <div className="cells">
                    {Array.from({length: range.size})
                        .map((_, i) => (
                            <div
                                key={range.getDate(i)?.getTime() || i}
                                className={clsx("cell", {weekend: range.isWeekend(i)})}
                            >
                                <span>{range.getDate(i)?.getDate()}</span>
                                <span>{range.getDate(i)?.toLocaleDateString(navigator.language, {weekday: 'short'})}</span>
                            </div>
                        ))
                    }
                </div>
            </div>


            {property.getRoomTypes()
                .map(rt => (
                    <Fragment key={rt.id}>

                        <div className="category">
                            <div className='category-inner' title={rt.name}>{rt.name}</div>
                        </div>
                        <div className="category-row">
                            <div className="cells">
                                {Array.from({length: range.size})
                                    .map((_, i) => (
                                        <div
                                            key={range.getDate(i)?.getTime() || i}
                                            className={clsx("cell", {weekend: range.isWeekend(i)})}
                                        >
                                            {property.getRoomsByCategory(rt.id).length}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {property.getRoomsByCategory(rt.id)
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
                                                onRoomBlockingClick={onBlockingClick}
                                            />
                                        </div>
                                        <div className='reserves'>
                                            <OrdersComponent
                                                key={r.id}
                                                room={r}
                                                range={range}
                                                onOrderClick={onBookingItemClick}
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            ))
                        }
                    </Fragment>
                ))
            }
            <NavButtons onPrev={onPrev} onNext={onNext}/>
        </div>
    );
}


