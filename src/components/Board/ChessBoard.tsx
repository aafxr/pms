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


export interface ChessBoardPropsType {
    board: Board
    property: Property
    range: DateRange
    onBookingItemClick?: (b: BookingItem) => unknown
    onCellClick?: (date: Date) => unknown
    onBlockingClick?: (b: RoomBlockPeriod) => unknown
    onPrev?: () => unknown
    onNext?: () => unknown
}


export function ChessBoard({
                               board,
                               property,
                               range,
                               onBlockingClick,
                               onCellClick,
                               onBookingItemClick,
                               onPrev,
                               onNext
                           }: ChessBoardPropsType) {
    const boardRef = useRef<HTMLDivElement>(null);


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        const el = e.currentTarget
        el.scrollBy({left: e.deltaY})
    }

    function handleScroll(e: MouseEvent<HTMLDivElement>) {

    }


    return (
        <div className='board'
             onWheel={handleWheel}
             onScroll={handleScroll}
        >

            <div className="filter">
                <Button variant={"cancel"} className="daily">Сутки</Button>
                <Button variant={"cancel"} className="hourly">Час</Button>
                <Row full>
                    <Button variant={"cancel"} className="month">
                        {new Date().toLocaleDateString(navigator.language, {month: "long", year: "numeric"})}
                    </Button>
                    <Button variant={"cancel"} className="today">Сегодня</Button>
                </Row>
            </div>

            <div className="property">
                <span>{property.name}</span>
            </div>

            <div className="date">
                {Object.entries(range.getMonths)
                    .map(([name, days]) => (
                        <div className='date-month' style={{gridColumn: `span ${days}`}}>
                            <span>{name}</span>
                        </div>
                    ))}
            </div>

            <div className="category">
                <div className='category-inner'>Категории</div>
            </div>
            <div className="category-row">
                <div className="cells">
                    {Array.from({length: range.size})
                        .map((_, i) => (
                            <div className="cell">
                                {range.getDate(i)?.getDate()}
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
                                        <div className="cell">{property.getRoomsByCategory(rt.id).length}</div>
                                    ))
                                }
                            </div>
                        </div>

                        {property.getRoomsByCategory(rt.id)
                            .map(r => (
                                <Fragment key={r.id}>
                                    <div className="room-category">
                                        <div className='room-category-inner' title={r.name}>{r.name}</div>
                                    </div>
                                    <div className="room-category-row">
                                        <div className="cells">
                                            {Array.from({length: range.size})
                                                .map((_, i) => (
                                                    <div
                                                        className="cell"
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


