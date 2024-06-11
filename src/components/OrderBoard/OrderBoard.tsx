import clsx from "clsx";
import React, {useEffect, useRef, useState} from 'react';

import {Button, ButtonsGroup} from "../buttons";
import {Row} from "../flex";

import './OrderBoard.css'


export type OrderBoardStateType = {}


export interface OrderBoardPropsType {
    className?: string
}


const groupButtons = [
    {id: 1, name: 'Сутки'},
    {id: 2, name: 'Час'}
]


export function OrderBoard({className}: OrderBoardPropsType) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [boardWith, setBoardWith] = useState('100%')

    const d = new Date()
    const daysInTHisMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() + 20


    useEffect(() => {
        calcBoardWith()
        window.addEventListener('resize', calcBoardWith)
        return () => {window.removeEventListener('resize', calcBoardWith)}
    }, []);


    function calcBoardWith(){
        if(!containerRef.current) return
        const w = containerRef.current.offsetWidth + (window.innerWidth - containerRef.current.offsetWidth) / 2
        setBoardWith(w + 'px')
    }


    function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
        const $el = e.currentTarget as HTMLDivElement
        $el.scrollBy({left: e.deltaY})
    }


    return (
        <div ref={containerRef} className={clsx('board', className)}>
            <div
                className='board-container'
                onWheel={handleScroll}
                style={{width:boardWith}}
            >
                <div className='filter'>
                    <ButtonsGroup select={1} buttons={groupButtons}/>
                    <Row className='info'>
                        <Button className='filter-month'><span>Октябрь, 2024</span></Button>
                        <Button className='filter-day'><span>Сегодня</span></Button>
                    </Row>
                </div>
                <div className='property'>Отель «Эрмитаж»</div>
                <div className='month'>Апрель</div>

                <div className='room-category'>Категории</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell-date', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>
                            {i + 1}
                        </div>
                    ))}
                </Row>

                <div className='room'>100</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>

                        </div>
                    ))}
                </Row>

                <div className='room'>101</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>

                        </div>
                    ))}
                </Row>

                <div className='room'>210</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>
                            {i + 1}
                        </div>
                    ))}
                </Row>

                <div className='room'>212</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>

                        </div>
                    ))}
                </Row>

                <div className='room-category without-number'>Без номера</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i} className='cell without-number'>

                        </div>
                    ))}
                </Row>

                <div className='room'>215</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i} className={clsx('cell', {
                            service: Math.random() < 0.2,
                            weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())
                        })}>

                        </div>
                    ))}
                </Row>

                <div className='room'>221</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>

                        </div>
                    ))}
                </Row>

                <div className='room'>312</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>

                        </div>
                    ))}
                </Row>

                <div className='room-category'>Люкс</div>
                <Row>
                    {Array.from({length: daysInTHisMonth}).map((_, i) => (
                        <div key={i}
                             className={clsx('cell-date', {weekend: [5, 6].includes(new Date(d.getFullYear(), d.getMonth(), i).getDay())})}>
                            {i + 1}
                        </div>
                    ))}
                </Row>

            </div>
        </div>
    );
}
