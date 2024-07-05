import {useState} from "react";
import {Button, Container, DateInput, Input, Modal, Select, Wrapper} from "../../components";
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
                <Wrapper className='reserveModal reserveModal-container'>
                    <Wrapper.Header>
                        <h2 className='reserveModal-mainTitle'>Бронирование</h2>
                    </Wrapper.Header>
                    <Wrapper.Content className='reserveModal-content'>
                        <div className='reserveModal-buttons'>
                            <Button className='reserveModal-button'>Создание брони</Button>
                            <Button className='reserveModal-button'>Контактные данные</Button>
                            <Button className='reserveModal-button'>Гости</Button>
                            <Button className='reserveModal-button'>Заселение</Button>
                            <Button className='reserveModal-button'>Доп. услуги</Button>
                        </div>

                        <div className='reserveModal-block'>
                            <div className='reserveModal-tilte'>Объект размещения</div>
                            <div className='reserveModal-options'>
                                <Select items={[]} title={'property'}/>
                                <div className='reserveModal-message'></div>
                            </div>
                        </div>

                        <div className='reserveModal-block'>
                            <div className='reserveModal-tilte'>Тип бронирования</div>
                            <div className='reserveModal-options'>

                                <div className='reserveModal-option'>
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
                                    <div className='reserveModal-message'></div>
                                </div>
                            </div>
                        </div>


                        <div className='reserveModal-block'>
                            <div className='reserveModal-row'>
                                <div className='reserveModal-checkIn'>
                                    <div className='reserveModal-tilte'>Заезд</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>

                                            <DateInput/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-checkOut'>
                                    <div className='reserveModal-tilte'>Выезд</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <DateInput/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-nights'>
                                    <div className='reserveModal-tilte'>&nbsp;</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Input className='reserveModal-count'/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='reserveModal-block'>
                            <div className='reserveModal-tilte'>Тип объекта аренды</div>
                            <div className='reserveModal-options'>
                                <div className='reserveModal-option'>
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
                                    <div className='reserveModal-message'></div>
                                </div>
                            </div>
                        </div>

                        <div className='reserveModal-block reserveModal-block-booking'>
                            <div className='reserveModal-row'>
                                <div className='reserveModal-category'>
                                    <div className='reserveModal-tilte'>Категория</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Select className='reserveModal-select' items={[]}/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-tarif'>
                                    <div className='reserveModal-tilte'>Тариф</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Select className='reserveModal-select' items={[]}/>
                                            <div className='reserveModal-message'>Тариф не задан на: 17 апреля
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-placing'>
                                    <div className='reserveModal-tilte'>Размещение</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Input className='reserveModal-count'/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-propertirsCount'>
                                    <div className='reserveModal-tilte'>Кол-во объектов</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Input className='reserveModal-count'/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-roomNumber'>
                                    <div className='reserveModal-tilte'>Номер комнаты</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Select className='reserveModal-select' items={[]}/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-guests'>
                                    <div className='reserveModal-tilte'>Гости</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Input className='reserveModal-count'/>
                                            <div className='reserveModal-message'>Взрослые</div>
                                        </div>
                                        <div className='reserveModal-option'>
                                            <Input className='reserveModal-count'/>
                                            <div className='reserveModal-message'>Дети</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='reserveModal-price'>
                                    <div className='reserveModal-tilte'>Стоимость проживания</div>
                                    <div className='reserveModal-options'>
                                        <div className='reserveModal-option'>
                                            <Input className='reserveModal-input reserveModal-input-currency'
                                                   data-currency={'₽'}/>
                                            <div className='reserveModal-message'></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Wrapper.Content>
                    <Wrapper.Footer>
                        <div className='reserveModal-footerButtons'>
                            <Button className='reserveModal-footerButton' disabled>Сохранить и закрыть</Button>
                            <Button className='reserveModal-footerButton' variant='cancel'>Отмена</Button>
                        </div>
                    </Wrapper.Footer>
                </Wrapper>
            </Modal>
        </div>
    )
}

