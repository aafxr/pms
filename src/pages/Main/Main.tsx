import React, {useEffect, useMemo, useState} from "react";
import {
    Blank,
    Button,
    ButtonGroupType,
    ButtonsGroup,
    Container,
    Header,
    Search,
    Select, SelectOptionType,
    Wrapper
} from "../../components";


import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {PropertiesService} from "../../core/classes/services/PropertiesService";
import NavButtons from "../../components/buttons/NavButtons/NavButtons";
import {Reservations} from "../../components/Reservations/Reservations";
import {ChessBoard} from "../../components/ChessBoard/ChessBoard";
import {useAppContext} from "../../contexts/AppContextProvider";
import {FetchRoomsRequestParams} from "../../api/fetchRooms";
import {DateRange} from "../../core/classes/v1/DateRange";
import {PrintIcon} from "../../components/svg";
import {Row} from "../../components/flex";

import './Main.css'

let defaultStartDate = new Date()
defaultStartDate = new Date(
    defaultStartDate.getFullYear(),
    defaultStartDate.getMonth(),
    1
)

const DAYS = 120
const OFFSET = 60


export function Main() {
    const {appState, setAppState} = useAppContext()

    const {property, board, bookingStatusFilter} = appState

    const [component, setComponent] = useState<'chess' | 'orders'>("chess")
    const [range, setRange] = useState(new DateRange(defaultStartDate, DAYS))
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState<FetchRoomsRequestParams>({
        end_date: range.end,
        start_date: range.start,
        per_page: 50,
        page: 1,
        daily: "daily"
    })

    const bookingStatuses = useMemo(() => {
        return Array.from(board?.bookigStatuses.values() || [])
            .map((e, i) => ({id: i, value: e}))
    }, [appState])

    function handleButtonGroupClick(e: ButtonGroupType) {
        if (e.id === 1) setComponent("chess")
        if (e.id === 2) setComponent("orders")
    }

    useEffect(() => {
        setLoading(true)
        PropertiesService.getProperties(query)
            .then(b => {
                if (b) {
                    if (!board) {
                        if (!property) {
                            const p = b.properties.values().next().value
                            setAppState(prev => ({...prev, property: p}))
                        }
                        // @ts-ignore
                        window.property = b.properties.get(1)
                        // @ts-ignore
                        window.board = b

                        setAppState(prev => ({...prev, board: b}))
                    } else {
                        board.merge(b)
                        setAppState({...appState, board: board})
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

        if (s.getTime() < range.start.getTime()) {
            const r = new DateRange(range.getDate(-OFFSET), range.size, appState.timeStrategy)
            // setAppState({...appState, time_from: r.start})
            setRange(r)
            setAppState({...appState, range: r})
            if (!loading) setQuery({...query, start_date: r.start, end_date: r.end})
            return
        }

        if (range.getDate(range.size).getTime() < e.getTime()) {
            const r = new DateRange(range.getDate(OFFSET), range.size, appState.timeStrategy)
            // setAppState({...appState, time_to: r.end})
            setRange(r)
            setAppState({...appState, range: r})
            if (!loading) setQuery({...query, start_date: r.start, end_date: r.end})
            return
        }
    }


    function handleTimeStrategyChange(s: BookingTimeStrategyType) {
        setAppState({...appState, timeStrategy: s})
    }


    function handleSelectBookingStatusFilter(v: SelectOptionType){
        setAppState({...appState, bookingStatusFilter: v.value})
    }

    console.log(appState)
    return (
        <Wrapper className='main'>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <Blank className='options-panel'>
                        <Row justify='between' full>
                            <Row className='gap-1'>
                                <ButtonsGroup
                                    select={1}
                                    buttons={[
                                        {id: 1, name: 'Основные объекты'},
                                        {id: 2, name: 'Дополнительные объекты'}
                                    ]}/>
                                <Select
                                    className='main-select-status'
                                    title={'Статус сделки'}
                                    value={bookingStatuses.find(bs=> bs.value === bookingStatusFilter)}
                                    items={bookingStatuses}
                                    onSelect={handleSelectBookingStatusFilter}
                                />
                                <Button
                                    className='reset'
                                    onClick={() => setAppState({...appState, bookingStatusFilter: undefined})}
                                >
                                    <span>Сбросить фильтр</span>
                                </Button>
                            </Row>
                            <Row className='gap-1' justify='end'>
                                <Search placeholder='Гость, номер или id бронирования'/>
                                <ButtonsGroup
                                    select={1}
                                    buttons={[
                                        {id: 1, name: 'Шахматка'},
                                        {id: 2, name: 'Бронирование'}
                                    ]}
                                    onClick={handleButtonGroupClick}
                                />
                                <Button className='print'>
                                    <PrintIcon className='icon-24'/>
                                </Button>
                            </Row>
                        </Row>
                    </Blank>
                    {board && property && component === 'chess' &&
                        <ChessBoard
                            className='main-board'
                            loading={loading}
                            board={board}
                            property={property}
                            strategy={appState.timeStrategy}
                            onBlockingClick={console.log}
                            onBookingItemClick={console.log}
                            onCellClick={console.log}
                            onRangeChange={handleBoardRangeChange}
                            onTimeStrategyChange={handleTimeStrategyChange}
                        />}

                    {board && property && component === "orders" &&
                        <Reservations
                            board={board}
                            property={property}
                            onBookingItemClick={console.log}
                        />

                    }

                    <NavButtons
                        onPrev={handlePrevButtonClick}
                        onNext={handleNextButtonClick}
                        prevDisabled={board ? board.pagination.page <= 1 : true}
                        nextDisabled={board ? board.pagination.page === board.pagination.last_page : true}
                    />
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
            </Wrapper.Footer>
        </Wrapper>
    )
}
