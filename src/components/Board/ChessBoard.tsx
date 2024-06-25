import React, {useEffect, useRef, useState} from 'react';

import {Board} from "../../core/classes/v1/Board";

import './ChessBoard.scss'


export interface BoardPropsType {

}


export function ChessBoard({}: BoardPropsType) {
    const boardRef = useRef<HTMLDivElement>(null);
    const [board, setBoard] = useState(new Board())


    return (
        <div className='board'>
            <div className="filter">
                <button className="daily">Сутки</button>
                <button className="hourly">Час</button>
                <button className="month">
                    {new Date().toLocaleDateString(navigator.language, {month: "long", year: "numeric"})}
                </button>
                <button className="today">Сегодня</button>
            </div>
            <div className="propety border"></div>
            <div className="date border"></div>
            <div className="category border"></div>
            <div className="category-row border">
                <div className="cells">
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                    <div className="cell border"></div>
                </div>
            </div>
        </div>
    );
}


