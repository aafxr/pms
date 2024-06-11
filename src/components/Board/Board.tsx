import React, {useEffect, useRef, useState} from 'react';

import {Button, ButtonsGroup} from "../buttons";
import {Row} from "../flex";

import './Board.css'
import BoardFilter from "./BoardFilter";


export interface BoardPropsType {

}


export function Board({}: BoardPropsType) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [boardWith, setBoardWith] = useState('100%')


    useEffect(() => {
        calcBoardWith()
        window.addEventListener('resize', calcBoardWith)
        return () => {
            window.removeEventListener('resize', calcBoardWith)
        }
    }, []);


    function calcBoardWith() {
        if (!containerRef.current) return
        const w = containerRef.current.offsetWidth + (window.innerWidth - containerRef.current.offsetWidth) / 2
        setBoardWith(w + 'px')
    }


    function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
        const $el = e.currentTarget as HTMLDivElement
        $el.scrollBy({left: e.deltaY})
    }


    return (
        <div className='board'>
            <div
                ref={containerRef}
                className='board-container'
            >
                <div
                    className='board-content'
                    onWheel={handleScroll}
                    style={{width: boardWith}}
                >
                    <div className='brow'>
                        <div className='brow-container'>

                            <BoardFilter/>
                            <div className='board-head'>
                                <div className='board-title'>Отель «Эрмитаж»</div>
                                <div className='board-months'>
                                    <div className='board-month'>april</div>
                                    <div className='board-month'>april</div>
                                    <div className='board-month'>april</div>
                                    <div className='board-month'>april</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='brow'>
                        <div className='brow-container'>
                            <div className='board-category'> category</div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                            <div className='board-date-cell'></div>
                        </div>
                    </div>
                    <div className='brow'>
                        <div className='brow-container'>
                            <div className='board-room'> room</div>
                            <div className='board-cell'></div>
                            <div className='board-cell'></div>
                            <div className='board-cell'></div>
                            <div className='board-cell'></div>
                            <div className='board-cell'></div>
                        </div>
                    </div>
                    <div className='brow'>
                        <div className='brow-container'>
                            <div className='board-room without-number'> room</div>
                            <div className='board-cell'></div>
                            <div className='board-cell without-number'></div>
                            <div className='board-cell'></div>
                            <div className='board-cell service'></div>
                            <div className='board-cell weekend'></div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}


