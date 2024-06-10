import clsx from "clsx";
import React from 'react';

import {Button, ButtonsGroup} from "../buttons";
import {Row} from "../flex";

import './OrderBoard.css'


export type OrderBoardStateType = {}


export interface OrderBoardPropsType {
    className?: string
}


export function OrderBoard({className}: OrderBoardPropsType) {
    const d = new Date()
    const daysInTHisMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()

    return (
        <div className={clsx('board', className)}>
            <div className='filter'>
                <ButtonsGroup
                    select={1}
                    buttons={[
                        {id: 1, name: 'Сутки'},
                        {id: 2, name: 'Час'}
                    ]}
                />
                <Row className='info'>
                    <Button className='filter-month'>Октябрь, 2024</Button>
                    <Button className='filter-day'>Сегодня</Button>
                </Row>
            </div>
            <div className='property'>Отель «Эрмитаж»</div>
            <div className='month'>Апрель</div>

            <div className='room-category'>Категории</div>
            <Row>
                {Array.from({length: daysInTHisMonth}).map((_, i) => (
                    <div key={i} className='cell-date'>
                        {i + 1}
                    </div>
                ))}
            </Row>

            <div className='room'>100</div>
            <Row>
                {Array.from({length: daysInTHisMonth}).map((_, i) => (
                    <div key={i} className='cell-date'>

                    </div>
                ))}
            </Row>

            <div className='room'>101</div>
            <Row>
                {Array.from({length: daysInTHisMonth}).map((_, i) => (
                    <div key={i} className='cell'>

                    </div>
                ))}
            </Row>

            <div className='room'>210</div>
            <Row>
                {Array.from({length: daysInTHisMonth}).map((_, i) => (
                    <div key={i} className='cell'>
                        {i+1}
                    </div>
                ))}
            </Row>

            <div className='room'>212</div>
            <Row>
                {Array.from({length: daysInTHisMonth}).map((_, i) => (
                    <div key={i} className='cell'>

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
                    <div key={i} className={clsx('cell', {service: Math.random() < 0.2})}>

                    </div>
                ))}
            </Row>

        </div>
    );
}
