import React, {useState} from 'react';

import {DateRange} from "../../core/classes/v1/DateRange";
import {ChevronIcon} from "../svg";
import clsx from "clsx";


export type ChessBoardLegendPropsType = {
    range: DateRange
    open?: boolean
    onOpenChange?: (value: boolean) => unknown
}


export function ChessBoardLegend({
                                     range,
                                     open = true,
                                     onOpenChange
}: ChessBoardLegendPropsType) {
    const isDaily = range.strategy === 'daily'

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


    function handleOpenChange(){
        const contentNode = document.querySelector<HTMLDivElement>('.chess-content')
        if (contentNode) contentNode.style.top = '0px'
        onOpenChange?.(!open)
    }


    return (
        <div className={clsx("chess-legend", {open})}>
            <div
                className="chess-category-name chess-category-name-legend"
                onClick={handleOpenChange}
            >
                <ChevronIcon className='chess-icon icon-16'/>
                Категории
            </div>
            <div className=" chess-cells">
                {new Array(range.size).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className={clsx("chess-cell chess-cell-legend", {weekend: [0,6].includes(range.getDate(i).getDay())})}>
                        {getCellLegend(i)}
                    </div>
                ))}
            </div>
        </div>
    );
}

