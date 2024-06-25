import React, {Fragment, useEffect, useRef, useState, WheelEvent, MouseEvent} from 'react';

import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {Board} from "../../core/classes/v1/Board";

import './ChessBoard.scss'
import {Button} from "../buttons";
import {Row} from "../flex";
import {BlockingComponent} from "./BlockingComponent";
import {OrdersComponent} from "./OrdersComponent";


export interface ChessBoardPropsType {
    board: Board
    property: Property
    range: DateRange
}


export function ChessBoard({board, property, range}: ChessBoardPropsType) {
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

            <div className="property border">
                <span>{property.name}</span>
            </div>

            <div className="date">
                {Object.entries(range.getMonths)
                    .map(([name, days]) => (
                        <div className='date-month border' style={{gridColumn: `span ${days}`}}>
                            <span>{name}</span>
                        </div>
                    ))}
            </div>

            <div className="category border">Категории</div>
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

                        <div className="category border">{rt.name}</div>
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
                                    <div className="room-category border">{r.name}</div>
                                    <div className="room-category-row">
                                        <div className="cells">
                                            {Array.from({length: range.size})
                                                .map((_, i) => (
                                                    <div className="cell"></div>
                                                ))
                                            }
                                        </div>
                                        <div className='orders'>
                                            <BlockingComponent key={r.id} room={r} range={range}/>
                                        </div>
                                        <div className='reserves'>
                                            <OrdersComponent key={r.id} room={r} range={range}/>
                                        </div>
                                    </div>
                                </Fragment>
                            ))
                        }
                    </Fragment>
                ))
            }
        </div>
    );
}


