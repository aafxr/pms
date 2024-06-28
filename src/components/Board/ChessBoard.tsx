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
import debounce from "debounce";


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
    const boardContainerRef = useRef<HTMLDivElement>(null);

    const [range, setRange] = useState<DateRange>(() => new DateRange(defaultStartDate, 1, strategy))
    // const rangeRef = useRef<DateRange>()
    // rangeRef.current = range

    const isDaily = strategy === 'daily'


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {document.removeEventListener('keydown', handleKeyDown)}
    }, []);


    useEffect(() => {
        calcContainerHeight()

        window.addEventListener('resize', calcContainerHeight)
        return () => {
            window.removeEventListener('resize', calcContainerHeight)
        }
    }, []);


    function calcContainerHeight() {
        const el = boardContainerRef.current
        if (!el) return

        const r = el.getBoundingClientRect()
        const maxHeight = window.innerWidth - r.top
        el.style.maxHeight = maxHeight + 'px'
    }


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

        const cellsCount = Math.ceil((b.offsetWidth - filter.offsetWidth) / width)
        const d = range.start
        setRange(new DateRange(d, cellsCount, range.strategy))
    }


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        e.stopPropagation()
        const {shiftKey} = e

        if(shiftKey) return

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
        const el = boardContainerRef.current
        if (!el) return
        // debugger

        // const st = el.scrollTop
        //
        const {altKey, shiftKey} = e
        if(!shiftKey) return
        //
        // let isScrollDown = false
        // if (st > lastScroll.current) {
        //     isScrollDown = true
        // }
        //
        // if (altKey) {
        //     lastScroll.current = st <= 0 ? 0 : st;
        //     el.scrollBy({top: isScrollDown ? 100 : -100})
        //     return
        // }

        // el.scrollTop = lastScroll.current

        let r: DateRange | undefined
        let k = altKey ? 1 : -1
        // if (shiftKey) k *= 5

        r = new DateRange(range.getDate(k), range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
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

    function handleKeyDown(e: KeyboardEvent){
        // left = 37
        // up = 38
        // right = 39
        // down = 40
        // const range = rangeRef.current
        // if(!range) return
        // debugger

        const {keyCode, shiftKey} = e

        let r: DateRange | undefined
        let k = 1

        if ( keyCode !== 37 && keyCode !== 39) return
        if(keyCode === 37){
            k = -k
        }

        if (shiftKey) k *= 5

        r = new DateRange(range.getDate(k), range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
    }


    return (
        <div
            ref={boardRef}
            className='board'
        >
            <div
                ref={boardContainerRef}
                className='board-container'
                onWheel={handleWheel}
                onScroll={debounce(handleScroll, 50)}
            >
                <div className='board-inner'>
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
                                title={range.start.toLocaleDateString(navigator.language, {
                                    month: "long",
                                    year: "numeric"
                                })}
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
                        {strategy === "daily" && Object.entries(range.getMonths())
                            .map(([name, days]) => (
                                <div key={name} className='date-month' style={{gridColumn: `span ${days}`}}>
                                    <span>{name}</span>
                                </div>
                            ))}
                        {strategy === "hourly" && Object.entries(range.getDays())
                            .map(([name, days]) => (
                                <div key={name} className='date-day' style={{gridColumn: `span ${days}`}}>
                                    <span>{name}</span>
                                </div>
                            ))}
                    </div>

                    <div className="category category-main">
                        <div className='category-inner'>Категории</div>
                    </div>
                    <div
                        className={clsx("category-row category-row-main", strategy)}
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
            </div>
        </div>
    );
}


