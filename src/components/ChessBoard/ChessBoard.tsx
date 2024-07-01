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


    function handleCategoryClick(e: MouseEvent<HTMLDivElement>) {
        const el = e.currentTarget
        const subel = el.querySelector<HTMLDivElement>('.chess-subcategories')
        if (!subel) return
        subel.classList.toggle('open')
        if (subel.classList.contains('open')) {
            subel.style.maxHeight = subel.scrollHeight + 'px'
        } else {
            subel.style.maxHeight = '0'
        }
    }


    function getDayItems(){

    }


    function getCellLegend(i: number) {
        if (isDaily) {
            return (
                <div className='chess-weekday'>
                    <span>{range.getDate(i).getDate()}</span>
                    <span>{range.getDate(i).toLocaleDateString(navigator.language, {weekday: 'short'})}</span>
                </div>
            )
        }
        return (
            <span>{range.getDate(i).toLocaleTimeString(navigator.language, {
                hour: "numeric",
                minute: 'numeric'
            })}</span>
        )
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
                            <DayItems range={range} />
                        </div>
                    </div>

                    <div className="chess-legend">
                        <div className="chess-category-name">Категории</div>
                        <div className=" chess-cells">
                            {arr.map((_, i) => (
                                <div key={i} className="chess-cell chess-cell-legend">{getCellLegend(i)}</div>
                            ))}
                        </div>
                    </div>
                </div>


                {property.getRoomTypes().map(rt => (
                    <div className="chess-category" onClick={handleCategoryClick}>
                        <div className="chess-category-name">{rt.name}</div>
                        <div className="chess-cells">
                            {arr.map((_, i) => (
                                <div key={i} className="chess-cell chess-cell-category">{i}</div>
                            ))}
                        </div>

                        <div className='chess-subcategories'>
                            {rt.rooms.map(r => (
                                <div className='chess-subcategory'>
                                    <div className="chess-subcategory-name">{r.name}&nbsp;{r.id}</div>
                                    <div className="chess-cells">
                                        {arr.map((_, i) => (
                                            <div key={i} className="chess-cell">{i}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



















