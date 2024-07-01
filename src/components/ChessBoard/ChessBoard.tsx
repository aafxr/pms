import clsx from "clsx";
import React, {MouseEvent, useEffect, useRef, useState, WheelEvent} from 'react';

import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {Board} from "../../core/classes/v1/Board";
import {DayItems} from "./DayItems";

import './ChessBoard.scss'
import {ChessBoardLegend} from "./ChessBoardLegend";
import {ChessBoardCategory} from "./ChessBoardCategory";


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
                               onBookingItemClick,
                               onCellClick,
                               onBlockingClick,
                               onPrev,
                               onNext,
                               onRangeChange,
                               onTimeStrategyChange,
                           }: ChessBoardPropsType) {
    const boardContainerRef = useRef<HTMLDivElement>(null);

    const [categoriesOpen, setCategoriesOpen] = useState(true)

    const [range, setRange] = useState<DateRange>(() => new DateRange(defaultStartDate, 1, strategy))
    const arr = new Array(range.size).fill(0)
    const isDaily = strategy === 'daily'


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
        const b = boardContainerRef.current
        if (!b) return
        const filter = b.querySelector<HTMLDivElement>('.chess-filter')
        if (!filter) return

        const cs = window.getComputedStyle(b)
        const width =
            parseInt(cs.getPropertyValue('--chess-cell-width'))
            + parseInt(cs.getPropertyValue('--chess-gap'))

        const cellsCount = Math.ceil((b.offsetWidth - filter.offsetWidth) / width)
        const d = range.start
        setRange(new DateRange(d, cellsCount, range.strategy))
    }


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        e.stopPropagation()
        const {shiftKey} = e

        if (shiftKey) return

        let r: DateRange | undefined
        let k = 3

        k = e.deltaY > 0 ? k : -k
        const d = range.getDate(k)
        r = new DateRange(d, range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
    }


    function handleCategoriesClick(val: boolean) {
        setCategoriesOpen(val)
    }


    return (
        <div className='chess'>
            <div
                ref={boardContainerRef}
                className="chess-content"
                onWheel={handleWheel}
            >
                <div className="chess-header">

                    <div className="chess-filter">
                        <div className="chess-r1">
                            <button
                                className={clsx("chess-btn chess-daily", {active: range.strategy === 'daily'})}
                                onClick={() => onTimeStrategyChange?.('daily')}
                            >
                                День
                            </button>
                            <button
                                className={clsx('chess-btn chess-hourly', {active: range.strategy === 'hourly'})}
                                onClick={() => onTimeStrategyChange?.('hourly')}
                            >
                                Час
                            </button>
                        </div>
                        <div className="chess-r2">
                            <button className="chess-btn chess-month active">
                                june 2
                            </button>
                            <button className="chess-btn chess-day active">
                                сегодня
                            </button>
                        </div>
                    </div>

                    <div className="chess-main-info">
                        <div className="chess-property">
                            <span>{property.name}</span>
                        </div>
                        <div className="chess-days">
                            <DayItems range={range}/>
                        </div>
                    </div>

                    <ChessBoardLegend open={categoriesOpen} onOpenChange={handleCategoriesClick} range={range}/>
                </div>

                {categoriesOpen &&
                    property
                        .getRoomTypes()
                        .map(rt => <ChessBoardCategory key={rt.id} range={range} roomType={rt}/>)}
            </div>
        </div>
    );
}



















