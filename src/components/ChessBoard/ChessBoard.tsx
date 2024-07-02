import clsx from "clsx";
import React, {MouseEvent, useEffect, useRef, useState, WheelEvent} from 'react';

import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import NavButtons from "../buttons/NavButtons/NavButtons";
import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {ChessBoardCategory} from "./ChessBoardCategory";
import {ChessBoardLegend} from "./ChessBoardLegend";
import {Board} from "../../core/classes/v1/Board";
import {DayItems} from "./DayItems";

import './ChessBoard.scss'


export interface ChessBoardPropsType {
    className?: string
    loading?: boolean
    board: Board
    property: Property
    strategy: BookingTimeStrategyType
    onBookingItemClick?: (b: BookingItem) => unknown
    onCellClick?: (date: Date) => unknown
    onBlockingClick?: (b: RoomBlockPeriod[]) => unknown
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


const defaultNodeParams = {
    maxHeight: 0,
    headerHeight: 0
}


export function ChessBoard({
                               className,
                               loading,
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
    const boardContentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const [categoriesOpen, setCategoriesOpen] = useState(true)
    const [range, setRange] = useState<DateRange>(() => new DateRange(defaultStartDate, 1, strategy))
    const nodeParams = useRef(defaultNodeParams)


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
        const maxHeight = window.innerHeight - r.top
        el.style.maxHeight = maxHeight + 'px'
        nodeParams.current.maxHeight = maxHeight
        nodeParams.current.headerHeight = headerRef.current?.offsetHeight || 0
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

        if (shiftKey) {
            const el = boardContentRef.current
            if (!el) return

            const top = parseInt(el.style.top) || 0

            el.style.top = Math.min(
                Math.max(
                    top - e.deltaY,
                    nodeParams.current.maxHeight - nodeParams.current.headerHeight - el.offsetHeight-180)
                , 0) + 'px'
            return
        }

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


    function handleClickToday() {
        const r = new DateRange(defaultStartDate, range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
    }

    function handleMonthClick() {
        const s = range.start
        const d = new Date(s.getFullYear(), s.getMonth())
        const r = new DateRange(d, range.size, range.strategy)
        setRange(r)
        onRangeChange?.(r)
    }


    return (
        <div className={clsx('chess', className)}>
            <div
                ref={boardContainerRef}
                className="chess-container"
                onWheel={handleWheel}
            >
                {loading && < div className='chess-loader'>Загрузка ...</div>}
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
                            <button className="chess-btn chess-month active" onClick={handleMonthClick}>
                                {range.start.toLocaleDateString(navigator.language, {month: "long", year: "numeric"})}
                            </button>
                            <button className="chess-btn chess-day active" onClick={handleClickToday}>
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

                <div ref={boardContentRef} className='chess-content'>
                    {categoriesOpen &&
                        property
                            .getRoomTypes()
                            .map(rt =>
                                <ChessBoardCategory
                                    key={rt.id}
                                    range={range}
                                    roomType={rt}
                                    onCellClick={onCellClick}
                                    onBookingItemClick={onBookingItemClick}
                                    onBlockingClick={onBlockingClick}
                                />)}
                </div>
                <NavButtons
                    onPrev={onPrev}
                    onNext={onNext}
                    prevDisabled={board.pagination.page <= 1}
                    nextDisabled={board.pagination.page === board.pagination.last_page}
                />
            </div>
        </div>
    );
}



















