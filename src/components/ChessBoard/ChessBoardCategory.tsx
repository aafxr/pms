import clsx from "clsx";
import React, {MouseEvent, useEffect, useRef, useState} from 'react';

import {DateRange} from "../../core/classes/v1/DateRange";
import {RoomType} from "../../core/classes/v1/RoomType";
import {ChessSubcategory} from "./ChessSubcategory";
import {ChevronIcon} from "../svg";


export type ChessBoardCategoryPropsType = {
    range: DateRange
    roomType: RoomType
}


export function ChessBoardCategory({roomType, range}: ChessBoardCategoryPropsType) {
    const [open, setOpen] = useState(false)
    const subcategoriesRef = useRef<HTMLDivElement>(null)

    const arr = Array.from({length: range.size}).fill(0)


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
        setOpen(!open)
    }


    return (
        <div
            className={clsx("chess-category", {open})}
        >
            <div
                className="chess-category-name"
                onClick={handleCategoryClick}
            >
                <ChevronIcon className=' chess-icon icon-16' />
                {roomType.name}
            </div>
            <div className="chess-cells">
                {arr.map((_, i) => (
                    <div key={i} className="chess-cell chess-cell-category">
                        {roomType.getFreeRooms(range.getDate(i))}
                    </div>
                ))}
            </div>

            <div
                ref={subcategoriesRef}
                className='chess-subcategories'
            >
                {roomType.rooms.map(r => (
                    <ChessSubcategory
                        key={r.id}
                        open={open}
                        range={range}
                        room={r}
                        onBookingClick={console.log}
                        onCellClick={console.log}
                    />
                ))}
            </div>
        </div>
    );
}
