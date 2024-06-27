import clsx from "clsx";
import React, {useEffect, useRef, useState, WheelEvent, MouseEvent} from 'react';

import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {Board} from "../../core/classes/v1/Board";

import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BoardRoomTypeComponent} from "./BoardRoomTypeComponent";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import NavButtons from "../buttons/NavButtons/NavButtons";
import {Button} from "../buttons";
import {Row} from "../flex";

import './ChessBoard.scss'


export interface ChessBoardPropsType {
    board: Board
    property: Property
    strategy: BookingTimeStrategyType
    onBookingItemClick?: (b: BookingItem) => unknown
    onCellClick?: (date: Date) => unknown
    onBlockingClick?: (b: RoomBlockPeriod) => unknown
    onPrev?: () => unknown
    onNext?: () => unknown
    onRangeChange?: (range: DateRange) => unknown
    onTimeStrategyChange?: (s: BookingTimeStrategyType) => unknown
}

let defaultStartDate = new Date()
defaultStartDate = new Date(
    defaultStartDate.getFullYear(),
    defaultStartDate.getMonth(),
    defaultStartDate.getDate()
)


export function ChessBoard({
                               board,
                               property,
                               strategy,
                               onBlockingClick,
                               onCellClick,
                               onBookingItemClick,
                               onPrev,
                               onNext,
                               onRangeChange,
                               onTimeStrategyChange
                           }: ChessBoardPropsType) {
    const boardRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState<DateRange>(() => new DateRange(defaultStartDate, 20, strategy))

    const isDaily = strategy === 'daily'


    useEffect(() => {
        if (range.strategy !== strategy) {
            setRange(new DateRange(range.start, range.size, strategy))
        }
    }, [strategy]);


    useEffect(() => {
        calcDateRange()
        window.addEventListener('resize', calcDateRange)
        return () => {
            window.removeEventListener('resize', calcDateRange)
        }
    }, []);


    function calcDateRange() {
        const b = boardRef.current
        if (!b) return
        const filter = b.querySelector<HTMLDivElement>('.filter')
        if (!filter) return

        const cs = window.getComputedStyle(b)
        const width =
            parseInt(cs.getPropertyValue('--b-cell-wz'))
            + parseInt(cs.getPropertyValue('--bgap'))

        const cellsCount = Math.floor((b.offsetWidth - filter.offsetWidth) / width) + 1
        const d = range.start
        setRange(new DateRange(d, cellsCount, range.strategy))
    }


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        let r: DateRange | undefined
        let k = 3

        k = e.deltaY > 0 ? k : -k
        const d = range.getDate(k)
        r = new DateRange(d, range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
    }

    function handleScroll(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        e.preventDefault()
    }


    function handleClickToday() {
        const r = new DateRange(defaultStartDate, range.size, range.strategy)
        setRange(r)
    }

    function handleMonthClick() {
        const s = range.start
        const d = new Date(s.getFullYear(), s.getMonth())
        const r = new DateRange(d, range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
    }


    function handleTimeStrategyChange(st: BookingTimeStrategyType) {
        onTimeStrategyChange?.(st)
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
                    <Button
                        variant={strategy === "daily" ? "cancel" : 'regular'}
                        className="daily"
                        onClick={() => handleTimeStrategyChange('daily')}
                    >
                        Сутки
                    </Button>
                    <Button
                        variant={strategy === "hourly" ? "cancel" : "regular"}
                        className="hourly"
                        onClick={() => handleTimeStrategyChange('hourly')}
                    >
                        Час
                    </Button>

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
                {strategy === "daily" && Object.entries(range.getMonths)
                    .map(([name, days]) => (
                        <div key={name} className='date-month' style={{gridColumn: `span ${days}`}}>
                            <span>{name}</span>
                        </div>
                    ))}
                {strategy === "hourly" && Object.entries(range.getDays)
                    .map(([name, days]) => (
                        <div key={name} className='date-day' style={{gridColumn: `span ${days}`}}>
                            <span>{name}</span>
                        </div>
                    ))}
            </div>

            <div className="category">
                <div className='category-inner'>Категории</div>
            </div>
            <div
                className={clsx("category-row", strategy)}
            >
                <div className="cells">
                    {Array.from({length: range.size})
                        .map((_, i) => (
                            <div
                                key={range.getDate(i)?.getTime() || i}
                                className={clsx("cell", {weekend: range.isWeekend(i)})}
                            >
                                {isDaily
                                    ? (
                                        <>
                                            <span>{range.getDate(i).getDate()}</span>
                                            <span>{range.getDate(i).toLocaleDateString(navigator.language, {weekday: 'short'})}</span>
                                        </>
                                    ) : <span>{range.getDate(i).toLocaleTimeString(navigator.language, {
                                        hour: "numeric",
                                        minute: 'numeric'
                                    })}</span>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>


            {property.getRoomTypes()
                .map(rt => (
                    <BoardRoomTypeComponent
                        key={rt.id}
                        strategy={strategy}
                        range={range}
                        property={property}
                        roomType={rt}
                        onRoomBlockingClick={onBlockingClick}
                        onOrderClick={onBookingItemClick}
                        onCellClick={onCellClick}
                    />
                ))
            }
            <NavButtons onPrev={onPrev} onNext={onNext}/>
        </div>
    );
}


