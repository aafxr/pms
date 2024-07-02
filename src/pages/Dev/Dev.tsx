import React, {Fragment, useEffect, useState} from 'react';
import {ChessBoard} from "../../components/ChessBoard/ChessBoard";
import {Board} from "../../core/classes/v1/Board";
import {Property} from "../../core/classes/v1/Property";
import {DateRange} from "../../core/classes/v1/DateRange";
import {FetchRoomsRequestParams} from "../../api/fetchRooms";
import {PropertiesService} from "../../core/classes/services/PropertiesService";
import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {useAppContext} from "../../contexts/AppContextProvider";
import {Wrapper} from "../../components";

let defaultStartDate = new Date()
defaultStartDate = new Date(
    defaultStartDate.getFullYear(),
    defaultStartDate.getMonth(),
    defaultStartDate.getDate()
)

const DAYS = 120

export function Dev() {

    const {appState, setAppState} = useAppContext()
    const [board, setBoard] = useState<Board>()
    const [property, setProperty] = useState<Property>()
    const [range, setRange] = useState(new DateRange(defaultStartDate, DAYS))
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState<FetchRoomsRequestParams>({
        end_date: range.end,
        start_date: range.start,
        per_page: 50,
        page: 1,
        daily: "daily"
    })


    useEffect(() => {
        setLoading(true)
        PropertiesService.getProperties(query)
            .then(b => {
                if (b) {
                    if (!board) {
                        if (!property) {
                            const p = b.properties.values().next().value
                            setProperty(p)
                        }
                        // @ts-ignore
                        window.property = b.properties.get(1)
                        // @ts-ignore
                        window.board = b

                        setBoard(b)
                    } else {
                        board.merge(b)
                        setBoard(board)
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [query]);


    function handleNextButtonClick() {
        if (!board) return
        board.clear()
        if (Number(query.page) >= board.pagination.last_page) return
        const q = {...query}
        q.page = (q.page || 1) + 1
        setQuery(q)
    }

    function handlePrevButtonClick() {
        if (!board) return
        board.clear()
        if (Number(query.page) <= 1) return
        const q = {...query}
        q.page = (q.page || 1) - 1
        setQuery(q)
    }


    function handleBoardRangeChange(r: DateRange) {
        const s = r.start
        const e = r.end

        // const {time_from, time_to} = appState

        if (s.getTime() < range.start.getTime()) {
            const r = new DateRange(range.getDate(-DAYS), range.size, appState.timeStrategy)
            // setAppState({...appState, time_from: r.start})
            setRange(r)
            if (!loading) setQuery({...query, start_date: r.start, end_date: r.end})
            return
        }

        if (range.getDate(range.size ).getTime() < e.getTime()) {
            const r = new DateRange(range.getDate(range.size), range.size, appState.timeStrategy)
            // setAppState({...appState, time_to: r.end})
            setRange(r)
            if (!loading) setQuery({...query, start_date: r.start, end_date: r.end})
            return
        }

        // setRange(new DateRange(r.start, range.size, range.strategy))
    }

    console.log(query)


    function handleTimeStrategyChange(s: BookingTimeStrategyType) {
        setAppState({...appState, timeStrategy: s})
    }


    if (!board || !property) return <Fragment/>


    return (
        <Wrapper>
            <div className='dev'>
                <ChessBoard
                    loading={loading}
                    board={board}
                    property={property}
                    strategy={appState.timeStrategy}
                    onBlockingClick={console.log}
                    onBookingItemClick={console.log}
                    onCellClick={console.log}
                    onNext={handleNextButtonClick}
                    onPrev={handlePrevButtonClick}
                    onRangeChange={handleBoardRangeChange}
                    onTimeStrategyChange={handleTimeStrategyChange}
                />
            </div>

        </Wrapper>
    );
}

