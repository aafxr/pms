import {useEffect} from "react";
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

import {Board2} from "../../components/Board2";
import './Main.css'


export function Main() {
    const navigate = useNavigate()

    function handleButtonGroupClick(e: ButtonGroupType){
        if(e.id === 2) navigate('/reservation')
    }

    useEffect(() => {
        const d = new Date()
        // fetchRooms({
        //     end_date: d,
        //     start_date: new Date(d.getFullYear() - 26, d.getMonth(), d.getDate())
        // })
        //     .then(console.log)
        //     .catch(console.error)
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
                                    <PrintIcon className='icon-24' />
                                </Button>
                            </Row>
                        </Row>
                    </Blank>

                    {/*<OrderBoard />*/}
                    {/*<Board />*/}
                    <Board2
                        onScrollToLeftSide={() => console.log('left')}
                        onScrollToRightSide={() => console.log('right')}
                    />
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
                <NavButtons />
            </Wrapper.Footer>
        </Wrapper>
    )
}
