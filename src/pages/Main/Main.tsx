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

import './Main.css'
import {DateRange} from "../../core/classes/v1/DateRange";
import {Board2} from "../../components/Board2";


export function Main() {
    const navigate = useNavigate()
    const [board, setBoard] = useState<Board>()
    const [property, setProperty] = useState<Property>()
    const [range, setRange] = useState(() => new DateRange(new Date(), 100))

    function handleButtonGroupClick(e: ButtonGroupType) {
        if (e.id === 2) navigate('/reservation')
    }

    useEffect(() => {
        const d = new Date()
        PropertiesService.getProperties({
            end_date: range.end,
            start_date: range.start,
            per_page: 5,
        })
            .then(b => {
                if (b) {
                    const p = b.properties.values().next().value
                    setBoard(b)
                    if (p) setProperty(p)
                }
            })
            .catch(console.error)
    }, []);


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
                    {board && property && <ChessBoard
                        board={board}
                        property={property}
                        range={range}
                    />}
                    {/*<Board2*/}
                    {/*    onScrollToLeftSide={() => console.log('left')}*/}
                    {/*    onScrollToRightSide={() => console.log('right')}*/}
                    {/*/>*/}
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
                <NavButtons/>
            </Wrapper.Footer>
        </Wrapper>
    )
}
