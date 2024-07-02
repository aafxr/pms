import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Blank,
    Button,
    ButtonGroupType,
    ButtonsGroup,
    Container,
    Header,
    Search,
    Select,
    Wrapper
} from "../../components";


import {BookingTimeStrategyType} from "../../core/types/BookingTimeStrategyType";
import {PropertiesService} from "../../core/classes/services/PropertiesService";
import {ChessBoard} from "../../components/ChessBoard/ChessBoard";
import {useAppContext} from "../../contexts/AppContextProvider";
import {FetchRoomsRequestParams} from "../../api/fetchRooms";
import {DateRange} from "../../core/classes/v1/DateRange";
import {Property} from "../../core/classes/v1/Property";
import {Board} from "../../core/classes/v1/Board";
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
    const navigate = useNavigate()
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

    function handleButtonGroupClick(e: ButtonGroupType) {
        if (e.id === 2) navigate('/reservation')
    }

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
                        setAppState({...appState, board: b})
                    } else {
                        board.merge(b)
                        setBoard(board)
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

        if (range.getDate(range.size ).getTime() < e.getTime()) {
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
                                <Select value={1}>
                                    <option value={1}>Статус 1</option>
                                    <option value={2}>Статус 2</option>
                                    <option value={3}>Статус 3</option>
                                    <option value={4}>Статус 4</option>
                                </Select>
                                <Button className='reset'>
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
                    {board && property &&
                        <ChessBoard
                            className='main-board'
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
                        />}
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
            </Wrapper.Footer>
        </Wrapper>
    )
}
