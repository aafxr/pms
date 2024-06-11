import React from 'react';

import {Container, CounterInput, Input, Select, Wrapper} from "../../components";
import {ReservationHeader} from "./ReservationHeader";

import './ReservationPage.css'
import {Column, Row} from "../../components/flex";

export function ReservationPage() {
    return (
        <Wrapper>
            <Wrapper.Content>
                <div className='reservation'>
                    <Container>
                        <ReservationHeader/>
                        <section>
                            <div className='title'>Объект размещения</div>
                            <Select>
                                <Select.Title>Отель Эрмитаж</Select.Title>
                                <Select.Items>
                                    <Select.Item>Отель 1</Select.Item>
                                    <Select.Item>Отель 2</Select.Item>
                                    <Select.Item>Отель 3</Select.Item>
                                </Select.Items>
                            </Select>
                        </section>

                        <section>
                            <div className='title'>Тип бронирования</div>
                            <Row className='reservation-row' justify={'start'}>
                                <input type="radio" id="dayly" name='org' value='Посуточный'/>
                                <label htmlFor="dayly">Посуточный</label>
                                <input type="radio" id="hourly" name='org' value='Почасовой'/>
                                <label htmlFor="hourly">Почасовой</label>
                            </Row>
                        </section>

                        <section>
                            <Row className='reservation-row' align={'end'}>
                                <Column>
                                    <div className='title'>Заезд</div>
                                    <div className='reservation-time'>
                                        <Input value='16.04.2024'/>
                                        <Select>
                                            <Select.Title>
                                                {new Date().toLocaleTimeString(navigator.language, {
                                                    minute: "2-digit",
                                                    hour: "2-digit"
                                                })}
                                            </Select.Title>
                                            <Select.Items>
                                                <Select.Item>Отель 1</Select.Item>
                                                <Select.Item>Отель 2</Select.Item>
                                                <Select.Item>Отель 3</Select.Item>
                                            </Select.Items>
                                        </Select>
                                    </div>
                                </Column>
                                <Column>
                                    <div className='title'>Выезд</div>
                                    <div className='reservation-time'>
                                        <Input value='16.04.2024'/>
                                        <Select>
                                            <Select.Title>
                                                {new Date().toLocaleTimeString(navigator.language, {
                                                    minute: "2-digit",
                                                    hour: "2-digit"
                                                })}
                                            </Select.Title>
                                            <Select.Items>
                                                <Select.Item>Отель 1</Select.Item>
                                                <Select.Item>Отель 2</Select.Item>
                                                <Select.Item>Отель 3</Select.Item>
                                            </Select.Items>
                                        </Select>
                                    </div>
                                </Column>
                                <Column>
                                    <Row>
                                        <CounterInput value={0}/>
                                        &nbsp;
                                        <span>Ночи</span>
                                    </Row>
                                </Column>
                            </Row>
                        </section>

                        <section>
                            <Column>
                                <div className='title'>Тип объекта аренды</div>
                                <Row className='reservation-row' justify={'start'}>
                                    <input type="radio" id="room" name='obj-type' value='Посуточный'/>
                                    <label htmlFor="room">Посуточный</label>
                                    <input type="radio" id="other-property" name='obj-type' value='Почасовой'/>
                                    <label htmlFor="other-property">Почасовой</label>
                                </Row>
                            </Column>
                        </section>

                        <section className='reservation-category'>
                            <Row className='reservation-row'>
                                <Column>
                                    <div className='title'>Категория</div>
                                    <Select className='category-select'>
                                        <Select.Title>Люкс</Select.Title>
                                        <Select.Items>
                                            <Select.Item>Отель 1</Select.Item>
                                            <Select.Item>Отель 2</Select.Item>
                                            <Select.Item>Отель 3</Select.Item>
                                        </Select.Items>
                                    </Select>
                                    <div className='reservation-info'>&nbsp;</div>

                                </Column>

                                <Column>
                                    <div className='title'>Тариф</div>
                                    <Select className='category-select'>
                                        <Select.Title>Стандарт</Select.Title>
                                        <Select.Items>
                                            <Select.Item>Отель 1</Select.Item>
                                            <Select.Item>Отель 2</Select.Item>
                                            <Select.Item>Отель 3</Select.Item>
                                        </Select.Items>
                                    </Select>
                                    <div className='reservation-info'>Тариф не задан на: 17 апреля</div>
                                </Column>

                                <Column>
                                    <div className='title'>Размещение</div>
                                    <Input value={'2 + 1'} size={1}/>
                                    <div className='reservation-info'>&nbsp;</div>

                                </Column>

                                <Column>
                                    <div className='title'>Кол-во объектов</div>
                                    <CounterInput value={1}/>
                                    <div className='reservation-info'>&nbsp;</div>

                                </Column>

                                <Column>
                                    <div className='title'>Номер комнаты</div>
                                    <Select className='category-select'>
                                        <Select.Title>Номер не выбран</Select.Title>
                                        <Select.Items>
                                            <Select.Item>Отель 1</Select.Item>
                                            <Select.Item>Отель 2</Select.Item>
                                            <Select.Item>Отель 3</Select.Item>
                                        </Select.Items>
                                    </Select>
                                    <div className='reservation-info'>&nbsp;</div>
                                </Column>

                                <Column>
                                    <div className='title'>Гости</div>
                                    <Row className='reservation-row'>
                                        <Column>
                                            <CounterInput value={0}/>
                                            <div className='reservation-info'>Взрослые</div>
                                        </Column>
                                        <Column>
                                            <CounterInput value={0}/>
                                            <div className='reservation-info'>Дети;</div>
                                        </Column>
                                    </Row>
                                    <div className='reservation-info'>&nbsp;</div>
                                </Column>

                                <Column>
                                    <div className='title'>Стоимость проживания</div>
                                    <Row className='reservation-row'>
                                        <Input value={'0.00'} />&nbsp;<span>₽</span>
                                    </Row>
                                    <div className='reservation-info'>&nbsp;</div>
                                </Column>
                            </Row>
                        </section>
                    </Container>
                </div>
            </Wrapper.Content>
        </Wrapper>
    );
}
