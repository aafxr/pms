import {useNavigate} from "react-router-dom";
import {
    Blank,
    Button,
    ButtonGroupType,
    ButtonsGroup,
    Container,
    Header,
    OrderBoard,
    Search,
    Select,
    Wrapper
} from "../../components";

import NavButtons from "../../components/buttons/NavButtons/NavButtons";
import {PrintIcon} from "../../components/svg";
import {Board} from "../../components/Board";
import {Row} from "../../components/flex";
import './Main.css'


export function Main() {
    const navigate = useNavigate()

    function handleButtonGroupClick(e: ButtonGroupType){
        if(e.id === 2) navigate('/reservation')
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
                            <Row className='gap-1' full>
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
                            <Row className='gap-1' justify='end' full>
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

                    <OrderBoard />
                    {/*<Board />*/}
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
                <NavButtons />
            </Wrapper.Footer>
        </Wrapper>
    )
}
