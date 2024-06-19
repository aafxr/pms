import React, {useEffect, useRef, WheelEvent, MouseEvent} from 'react';

import './Board2.scss'
import {fetchRooms} from "../../api/fetchRooms";
import {BedGlossary} from "./BedGlossary";
import {RoomBed} from "./RoomBed";
import {Property} from "./Property";
import {RoomCategory} from "./RoomCategory";
import {Room} from "./Room";


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
            .then(r => {
                if (!r) return
                console.log(r)
                const bedGlossaryMap = new Map<number, BedGlossary>()
                const roomsMap = new Map<number, Room>()
                const propertyMap = new Map<number, Property>()
                const roomCategoryMap = new Map<number, RoomCategory>()
                const roomTypeMap = new Map<number, RoomBed>

                r.data.room_types.forEach(roomCategory => {
                    roomCategory.room_type_beds
                        .forEach(room => bedGlossaryMap.set(room.room_bed_id, new BedGlossary(room.room_bed)))
                })

                r.data.properties.forEach(p => propertyMap.set(p.id, new Property(p)))

                for (const room of r.data.room_types) {
                    for (const br of room.room_type_beds) {
                        const bed = br.room_bed
                        if (!bedGlossaryMap.has(bed.id)) {
                            bedGlossaryMap.set(bed.id, new BedGlossary(bed))
                        }
                    }
                }

                for (const room of r.data.room_types) {

                    room.room_type_beds.forEach(r => {
                        const bed = r.room_bed
                        if (!bedGlossaryMap.has(bed.id)) {
                            bedGlossaryMap.set(bed.id, new BedGlossary(bed))
                        }
                    })

                    room.room_type_beds.forEach(r => {
                        if (!roomTypeMap.has(r.id)) {
                            const room = new RoomBed(r)
                            if (bedGlossaryMap.has(r.room_bed_id)) {
                                r.room_bed = bedGlossaryMap.get(r.room_bed_id)!
                            }
                        }
                    })

                    const category = new RoomCategory({
                        ...room,
                        room_type_beds: room.room_type_beds.map(r => roomTypeMap.has(r.id)
                            ? roomTypeMap.get(r.id)!
                            : new RoomBed()
                        )
                    })
                    if (roomCategoryMap.has(category.property_id)) {
                        category.property = roomCategoryMap.get(category.property_id)!
                    }
                }


                console.log('bedGlossaryMap', bedGlossaryMap)
                console.log('roomsMap', roomsMap)
                console.log('roomTypeMap', roomTypeMap)
                console.log('propertyMap', propertyMap)
                console.log('roomCategoryMap', roomCategoryMap)


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

