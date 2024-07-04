import clsx from "clsx";
import React, {MouseEvent, useEffect, useRef, useState} from 'react';

import {DateRange} from "../../core/classes/v1/DateRange";
import {RoomType} from "../../core/classes/v1/RoomType";
import {ChessSubcategory} from "./ChessSubcategory";
import {ChevronIcon} from "../svg";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {RoomBlockPeriod} from "../../core/classes/v1/RoomBlockPeriod";


export type ChessBoardCategoryPropsType = {
    range: DateRange
    roomType: RoomType
    onBookingItemClick?: (b: BookingItem) => unknown
    onCellClick?: (date: Date) => unknown
    onBlockingClick?: (b: RoomBlockPeriod[]) => unknown
}

const CHESSBOARD_OPEN_CATEGORIES = 'CHESSBOARD_OPEN_CATEGORIES'
type OpenCategoryType = Record<RoomType['id'], boolean>


export function ChessBoardCategory({
                                       roomType,
                                       range,
                                       onCellClick,
                                       onBookingItemClick,
                                       onBlockingClick
                                   }: ChessBoardCategoryPropsType) {
    const [open, setOpen] = useState(false)
    const subcategoriesRef = useRef<HTMLDivElement>(null)

    const arr = Array.from({length: range.size}).fill(0)


    useEffect(() => {
        const openCategories: OpenCategoryType = JSON.parse(localStorage.getItem(CHESSBOARD_OPEN_CATEGORIES) || '{}') || {}
        setOpen(Boolean(openCategories[roomType.id]))
    }, []);

    useEffect(() => {
        const el = subcategoriesRef.current
        if (!el) return

        el.classList.toggle('open')
        if (open) {
            el.style.maxHeight = el.scrollHeight + 'px'
        } else {
            el.style.maxHeight = '0'
        }
    }, [open]);


    function handleCategoryClick(e: MouseEvent<HTMLDivElement>) {
        const parent = e.currentTarget.parentElement?.parentElement

        const openCategories: OpenCategoryType = JSON.parse(localStorage.getItem(CHESSBOARD_OPEN_CATEGORIES) || '{}') || {}
        openCategories[roomType.id] = !open
        localStorage.setItem(CHESSBOARD_OPEN_CATEGORIES, JSON.stringify(openCategories))
        if(parent && open){
            parent.style.top = '0px'
        }
        setOpen(!open)
    }


    function handleCellClick(val: Date | RoomBlockPeriod[]){
        if(val instanceof Date){
            onCellClick?.(val)
            return
        }
        onBlockingClick?.(val)
    }


    return (
        <div className={clsx("chess-category", {open})}>
            <div
                className="chess-category-name"
                onClick={handleCategoryClick}
            >
                <ChevronIcon className=' chess-icon icon-16'/>
                {roomType.name}
            </div>

            <div className="chess-cells">
                {arr.map((_, i) => (
                    <div key={i} className={clsx("chess-cell chess-cell-category", {weekend: [0,6].includes(range.getDate(i).getDay())})}>
                        {roomType.getFreeRooms(range.getDate(i))}
                    </div>
                ))}
            </div>

            <div ref={subcategoriesRef} className='chess-subcategories'>
                {roomType.rooms.map(r => (
                    <ChessSubcategory
                        key={r.id}
                        open={open}
                        range={range}
                        room={r}
                        onBookingClick={onBookingItemClick}
                        onCellClick={handleCellClick}
                    />
                ))}
            </div>
        </div>
    );
}
