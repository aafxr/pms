import {useState} from "react";
import {Button, Container, DateInput, Input, Modal, Select} from "../../components";
import {RadioGroup, RadioOptionType} from "../../components/Radio/Radio";

import './Dev.scss'

type ReserveModalStateType = {
    propertyType: string
    rentType: string
}

const defaultState: ReserveModalStateType = {
    propertyType: "room",
    rentType: "daily"
}

export function Dev() {

    const [state, setState] = useState(defaultState)

    return (
        <div className='dev'>
            <Modal open={true}>
                <div className='reserveModal'>
                    <Container className='reserveModal-container'>
                        <h2 className='reserveModal-mainTitle'>Бронирование</h2>
                        <div className='reserveModal-buttons'>
                            <Button className='reserveModal-button'>Создание брони</Button>
                            <Button className='reserveModal-button'>Контактные данные</Button>
                            <Button className='reserveModal-button'>Гости</Button>
                            <Button className='reserveModal-button'>Заселение</Button>
                            <Button className='reserveModal-button'>Доп. услуги</Button>
                        </div>

                        <div className='reserveModal-block'>
                            <div className='reserveModal-tilte'>Объект размещения</div>
                            <Select items={[]} title={'property'}/>
                        </div>

                        <div className='reserveModal-block'>
                            <div className='reserveModal-tilte'>Тип бронирования</div>
                            <RadioGroup
                                className={'reserveModal-row'}
                                name={'prop'}
                                options={[
                                    {title: 'Посуточный', value: 'daily'},
                                    {title: 'Почасовой', value: 'hourly'}
                                ]}
                                selected={state.rentType}
                                onChange={(v) => setState({...state, rentType: v})}
                            />
                        </div>


                        <div className='reserveModal-block'>
                            <div className='reserveModal-row'>
                                <div className='reserveModal-checkIn'>
                                    <div className='reserveModal-tilte'>Заезд</div>
                                    <DateInput/>
                                </div>

                                <div className='reserveModal-checkOut'>
                                    <div className='reserveModal-tilte'>Выезд</div>
                                    <DateInput/>
                                </div>

                                <div className='reserveModal-nights'>

                                </div>
                            </div>
                        </div>


                        <div className='reserveModal-block'>
                            <div className='reserveModal-tilte'>Тип объекта аренды</div>
                                <RadioGroup
                                    className={'reserveModal-row'}
                                    name={'prop'}
                                    options={[
                                        {title: 'Комната', value: 'room'},
                                        {title: 'Доп. объект', value: 'extra'}
                                    ]}
                                    selected={state.propertyType}
                                    onChange={(v) => setState({...state, propertyType: v})}
                                />
                        </div>

                        <div className='reserveModal-booking'>
                            <div className='reserveModal-row'>
                                <div className='reserveModal-category'>
                                    <div className='reserveModal-tilte'>Категория</div>
                                    <Select className='reserveModal-select' items={[]}/>
                                </div>

                                <div className='reserveModal-tarif'>
                                    <div className='reserveModal-tilte'>Тариф</div>
                                    <Select className='reserveModal-select' items={[]}/>
                                </div>

                                <div className='reserveModal-placing'>
                                    <div className='reserveModal-tilte'>Размещение</div>
                                    <Input className='reserveModal-input'/>
                                </div>

                                <div className='reserveModal-propertirsCount'>
                                    <div className='reserveModal-tilte'>Кол-во объектов</div>
                                    <Input className='reserveModal-input'/>
                                </div>

                                <div className='reserveModal-roomNumber'>
                                    <div className='reserveModal-tilte'>Номер комнаты</div>
                                    <Select className='reserveModal-select' items={[]}/>
                                </div>

                                <div className='reserveModal-guests'>
                                    <div className='reserveModal-tilte'>Гости</div>
                                    <div className='reserveModal-guests-row'>
                                        <Input className='reserveModal-input'/>
                                        <Input className='reserveModal-input'/>

                                    </div>
                                </div>

                                <div className='reserveModal-price'>
                                    <div className='reserveModal-tilte'>Стоимость проживания</div>
                                    <Input className='reserveModal-input'/>
                                </div>


                            </div>
                        </div>


                    </Container>
                </div>
            </Modal>
        </div>
    )
}

