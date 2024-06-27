import {useEffect, useState} from "react";
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

import NavButtons from "../../components/buttons/NavButtons/NavButtons";
import {PrintIcon} from "../../components/svg";
import {Row} from "../../components/flex";

import {PropertiesService} from "../../core/classes/services/PropertiesService";
import {Property} from "../../core/classes/v1/Property";
import {Board} from "../../core/classes/v1/Board";
import {ChessBoard} from "../../components/Board";

import {FetchRoomsRequestParams} from "../../api/fetchRooms";
import {DateRange} from "../../core/classes/v1/DateRange";

import './Main.css'
import {useAppContext} from "../../contexts/AppContextProvider";

let defaultStartDate = new Date()
defaultStartDate = new Date(
    defaultStartDate.getFullYear(),
    defaultStartDate.getMonth(),
    defaultStartDate.getDate()
)

const DAYS = 90

export function Main() {
    const navigate = useNavigate()
    const {appState, setAppState} = useAppContext()
    const [board, setBoard] = useState<Board>()
    const [property, setProperty] = useState<Property>()
    const [range, setRange] = useState(new DateRange(defaultStartDate, DAYS))
    const [query, setQuery] = useState<FetchRoomsRequestParams>({
        end_date: range.end,
        start_date: range.start,
        per_page: 10,
        page: 1,
        daily: "daily"
    })

    function handleButtonGroupClick(e: ButtonGroupType) {
        if (e.id === 2) navigate('/reservation')
    }

    useEffect(() => {
        // @ts-ignore
        window.range = new DateRange(new Date(), 15, 'hourly')
        PropertiesService.getProperties(query)
            .then(b => {
                if (b) {
                    if(!board) {
                        const p = b.properties.values().next().value
                        // @ts-ignore
                        window.property = b.properties.get(1)
                        // @ts-ignore
                        window.board = b
                        setBoard(b)
                        if (p) setProperty(p)
                    } else{
                        board.merge(b)
                        setBoard(board)
                    }
                }
            })
            .catch(console.error)
    }, [query]);


    function handleNextButtonClick(){
        if(!board) return
        if(Number(query.page) >= board.pagination.last_page) return
        const q = {...query}
        q.page = (q.page || 1) + 1
        setQuery(q)
    }

    function handlePrevButtonClick(){
        if(!board) return
        if(Number(query.page) <= 1) return
        const q = {...query}
        q.page = (q.page || 1) - 1
        setQuery(q)
    }


    function handleBoardRangeChange(r: DateRange){
        const s = r.start
        const e = r.end

        const {time_from, time_to} = appState

        if(s.getTime() < time_from.getTime()){
            const r = new DateRange(range.getDate(-range.size), range.size)
            setAppState({...appState, time_from: r.start})
            setRange(r)
            setQuery({...query, start_date: r.start, end_date: r.end})
            return
        }

        if(time_to.getTime() < e.getTime()){
            const r = new DateRange(range.getDate(range.size), range.size)
            setAppState({...appState, time_to: r.end})
            setRange(r)
            setQuery({...query, start_date: r.start, end_date: r.end})
            return
        }

        setRange(new DateRange(r.start, range.size))
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
                            board={board}
                            property={property}
                            onBlockingClick={console.log}
                            onBookingItemClick={console.log}
                            onCellClick={console.log}
                            onNext={handleNextButtonClick}
                            onPrev={handlePrevButtonClick}
                            onRangeChange={handleBoardRangeChange}
                        />}
                    {/*<Board2*/}
                    {/*    onScrollToLeftSide={() => console.log('left')}*/}
                    {/*    onScrollToRightSide={() => console.log('right')}*/}
                    {/*/>*/}
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
            </Wrapper.Footer>
        </Wrapper>
    )
}
