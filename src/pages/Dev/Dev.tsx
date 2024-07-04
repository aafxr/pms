import {Button, Container, DateInput, Modal, Select} from "../../components";

import './Dev.scss'
import {RadioButton} from "../../components";
import {RadioGroup} from "../../components/Radio/Radio";

export function Dev() {

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
                            <div className='reserveModal-row'>
                                <label htmlFor="hourly">
                                    <input type="radio" id={'hourly'} name={'rentType'} value={'hourly'}/>
                                    Посуточный
                                </label>
                                <label htmlFor="daily">
                                    <input type="radio" id={'daily'} name={'rentType'} value={'daily'}/>
                                    Почасовой
                                </label>
                                {/*<RadioButton title={'Посуточный'} name={'rentType'} />*/}
                                {/*<RadioButton title={'Почасовой'} name={'rentType'}/>*/}
                            </div>
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
                            <div className='reserveModal-row'>
                                <label htmlFor="room">
                                    <input type="radio" id={'room'} name={'propType'} value={'room'}/>
                                    Номер
                                </label>
                                <label htmlFor="extraProp">
                                    <input type="radio" id={'extraProp'} name={'propType'} value={'extra'}/>
                                    Дополнительный объект
                                </label>
                                {/*<RadioButton title={'hourly'} checked/>*/}
                                {/*<RadioButton title={'daily'}/>*/}
                            </div>
                        </div>


                        <RadioGroup
                            name={'prop'}
                            options={[
                                {title: 'Комната', value: 'room'},
                                {title: 'Доп. объект', value: 'extra'}]}
                            selected={'room'}
                        />
                    </Container>
                </div>
            </Modal>
        </div>
    )
}

