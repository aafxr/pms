import React, {useEffect, useRef, WheelEvent, MouseEvent} from 'react';

import './Board2.scss'
import {fetchRooms} from "../../api/fetchRooms";
import {BedGlossary} from "./BedGlossary";
import {RoomBed} from "./RoomBed";
import {Property} from "./Property";
import {RoomCategory} from "./RoomCategory";
import {Room} from "./Room";
import {RoomTypes} from "../../core/classes/v1/RoomTypes";
import {RoomType} from "../../core/classes/v1/RoomType";


export interface Board2PropsType {
    onScrollToLeftSide?: () => unknown
    onScrollToRightSide?: () => unknown
}


function _Board2({onScrollToLeftSide, onScrollToRightSide}: Board2PropsType) {
    const boardRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        const d = new Date()
        fetchRooms({
            end_date: d,
            start_date: new Date(d.getFullYear() - 26, d.getMonth(), d.getDate())
        })
            .then(data => {
                if (!data) return

                // @ts-ignore
                window.data = data
                console.log(data)
            })
            .catch(console.error)
    }, []);


    useEffect(() => {
        const bel = boardRef.current;
        if (!bel) return;

        const elements = bel.querySelectorAll(".month") as unknown as Array<HTMLDivElement>;
        elements.forEach(
            (el) => (el.style.gridColumn = `span ${el.dataset.span}`)
        );
    }, []);


    function handleWheel(e: WheelEvent<HTMLDivElement>) {
        const el = e.currentTarget;
        let scrollToLeftSide = false
        let scrollToRightSide = false

        el.querySelectorAll<HTMLDivElement>(".syncWheel")
            .forEach(el => {
                el.scrollBy({left: Number(e.deltaY)})
                if (e.deltaY < 0 && el.scrollLeft === 0) scrollToLeftSide = true
                else if (e.deltaY > 0 && el.scrollLeft >= el.scrollWidth - el.offsetWidth) scrollToRightSide = true
            })
        if (scrollToLeftSide) onScrollToLeftSide?.()
        if (scrollToRightSide) onScrollToRightSide?.()

    }


    return (
        <div
            ref={boardRef}
            className="board"
            onWheel={handleWheel}
        >
            <div className="filter boarder">filter</div>
            <div className="header boarder">header</div>
            <div className="date syncWheel">
                <div className="month boarder" data-span="8">
                    <span>april</span>
                </div>
                <div className="month boarder" data-span="8">
                    <span>may</span>
                </div>
                <div className="month boarder" data-span="8">
                    <span>june</span>
                </div>
            </div>
            <div className="content">
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
                <div className="category boarder">category</div>
                <div className="cells syncWheel">
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                    <div className="cell">4</div>
                    <div className="cell">5</div>
                    <div className="cell">6</div>
                    <div className="cell">7</div>
                    <div className="cell">8</div>
                    <div className="cell">9</div>
                    <div className="cell">10</div>
                    <div className="cell">11</div>
                    <div className="cell">12</div>
                    <div className="cell">13</div>
                    <div className="cell">14</div>
                    <div className="cell">15</div>
                    <div className="cell">16</div>
                    <div className="cell">17</div>
                    <div className="cell">18</div>
                    <div className="cell">19</div>
                    <div className="cell">20</div>
                    <div className="cell">21</div>
                    <div className="cell">22</div>
                    <div className="cell">23</div>
                    <div className="cell">24</div>
                </div>
            </div>
        </div>
    );
}


export const Board2 = Object.assign(_Board2, {})

