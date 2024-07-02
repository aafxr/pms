import React from 'react';

import {Container, CounterInput, Header, Input, Select, Wrapper} from "../../components";

import './ReservationPage.css'
import {Reservations} from "../../components/Reservations/Reservations";
import {useAppContext} from "../../contexts/AppContextProvider";



export function ReservationPage() {
    const {appState: {board}, setAppState} = useAppContext()


    if(!board) return <></>


    return (
        <Wrapper>
            <Wrapper.Header>
                <Header />
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <Reservations board={board} />
                </Container>
            </Wrapper.Content>
        </Wrapper>
    );
}


// <div className='reservation'>
//     <Container>
//         <ReservationHeader/>
//         <section>
//             <div className='title'>Объект размещения</div>
//             <Select value={1}>
//                 <option value={1}>Отель 1</option>
//                 <option value={2}>Отель 2</option>
//                 <option value={3}>Отель 3</option>
//             </Select>
//         </section>
//
//         <section>
//             <div className='title'>Тип бронирования</div>
//             <Row className='reservation-row' justify={'start'}>
//                 <input type="radio" id="dayly" name='org' value='Посуточный'/>
//                 <label htmlFor="dayly">Посуточный</label>
//                 <input type="radio" id="hourly" name='org' value='Почасовой'/>
//                 <label htmlFor="hourly">Почасовой</label>
//             </Row>
//         </section>
//
//         <section>
//             <Row className='reservation-row' align={'end'}>
//                 <Column>
//                     <div className='title'>Заезд</div>
//                     <div className='reservation-time'>
//                         <Input value='16.04.2024'/>
//                         <Select value={1}>
//                             <option value={1}>Отель 1</option>
//                             <option value={2}>Отель 2</option>
//                             <option value={3}>Отель 3</option>
//                         </Select>
//                     </div>
//                 </Column>
//                 <Column>
//                     <div className='title'>Выезд</div>
//                     <div className='reservation-time'>
//                         <Input value='16.04.2024'/>
//                         <Select value={1}>
//                             <option value={1}>Отель 1</option>
//                             <option value={2}>Отель 2</option>
//                             <option value={3}>Отель 3</option>
//                         </Select>
//                     </div>
//                 </Column>
//                 <Column>
//                     <Row>
//                         <CounterInput value={0}/>
//                         &nbsp;
//                         <span>Ночи</span>
//                     </Row>
//                 </Column>
//             </Row>
//         </section>
//
//         <section>
//             <Column>
//                 <div className='title'>Тип объекта аренды</div>
//                 <Row className='reservation-row' justify={'start'}>
//                     <input type="radio" id="room" name='obj-type' value='Посуточный'/>
//                     <label htmlFor="room">Посуточный</label>
//                     <input type="radio" id="other-property" name='obj-type' value='Почасовой'/>
//                     <label htmlFor="other-property">Почасовой</label>
//                 </Row>
//             </Column>
//         </section>
//
//         <section className='reservation-category'>
//             <Row className='reservation-row'>
//                 <Column>
//                     <div className='title'>Категория</div>
//                     <Select value={1}>
//                         <option value={1}>Отель 1</option>
//                         <option value={2}>Отель 2</option>
//                         <option value={3}>Отель 3</option>
//                     </Select>
//                     <div className='reservation-info'>&nbsp;</div>
//
//                 </Column>
//
//                 <Column>
//                     <div className='title'>Тариф</div>
//                     <Select value={1}>
//                         <option value={1}>Отель 1</option>
//                         <option value={2}>Отель 2</option>
//                         <option value={3}>Отель 3</option>
//                     </Select>
//                     <div className='reservation-info'>Тариф не задан на: 17 апреля</div>
//                 </Column>
//
//                 <Column>
//                     <div className='title'>Размещение</div>
//                     <Input value={'2 + 1'} size={1}/>
//                     <div className='reservation-info'>&nbsp;</div>
//
//                 </Column>
//
//                 <Column>
//                     <div className='title'>Кол-во объектов</div>
//                     <CounterInput value={1}/>
//                     <div className='reservation-info'>&nbsp;</div>
//
//                 </Column>
//
//                 <Column>
//                     <div className='title'>Номер комнаты</div>
//                     <Select value={1}>
//                         <option value={1}>Отель 1</option>
//                         <option value={2}>Отель 2</option>
//                         <option value={3}>Отель 3</option>
//                     </Select>
//                     <div className='reservation-info'>&nbsp;</div>
//                 </Column>
//
//                 <Column>
//                     <div className='title'>Гости</div>
//                     <Row className='reservation-row'>
//                         <Column>
//                             <CounterInput value={0}/>
//                             <div className='reservation-info'>Взрослые</div>
//                         </Column>
//                         <Column>
//                             <CounterInput value={0}/>
//                             <div className='reservation-info'>Дети;</div>
//                         </Column>
//                     </Row>
//                     <div className='reservation-info'>&nbsp;</div>
//                 </Column>
//
//                 <Column>
//                     <div className='title'>Стоимость проживания</div>
//                     <Row className='reservation-row'>
//                         <Input value={'0.00'}/>&nbsp;<span>₽</span>
//                     </Row>
//                     <div className='reservation-info'>&nbsp;</div>
//                 </Column>
//             </Row>
//         </section>
//     </Container>
// </div>
