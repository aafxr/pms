import './Dev.scss'
import React, {useState} from "react";
import {ExtraService} from "../../core/classes/v1/ExtraService";
import {Button, Input, Modal, Wrapper} from "../../components";
import {RadioGroup} from "../../components/Radio/Radio";
import {RoomType} from "../../core/classes/v1/RoomType";
import {Tariff} from "../../core/classes/v1/Tariff";
import {TextArea} from "../../components/TextArea";
import {PlusIcon} from "../../components/svg";


export interface NewTariffModalPropsType {
    onSubmit?: (t: Tariff) => unknown
    onClose?: () => unknown
}


export function Dev({onSubmit, onClose}: NewTariffModalPropsType) {
    const [tariff, setTariff] = useState(new Tariff())
    const roomTypes: RoomType[] = [
        new RoomType({id: 1, name: '123'}),
        new RoomType({id: 2, name: '321'}),
    ]
    const extraServices: ExtraService[] = [
        new ExtraService({id: 1, name: 'e123'}),
        new ExtraService({id: 2, name: 'e321'}),
    ]


    function handleTariffNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const t = new Tariff(tariff)
        t.name = e.target.value
        setTariff(t)
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const t = new Tariff(tariff)
        t.description = e.target.value
        setTariff(t)
    }


    function handleRoomTypeCloseIconClick(rt: RoomType) {
    }


    function handleExtraServiceCloseIconClick(rt: ExtraService) {
    }


    function handeCancelButtonClick() {

    }


    function handleSaveButtonClick() {

    }


    return (
        <Modal open={true}>
            <div className='tariffForm'>
                <div className='tariffForm-content'>
                    <Wrapper>
                        <Wrapper.Content>
                            <h2 className='tariffForm-mainTitle'>Редактирование тарифа</h2>
                            <div className='tariffForm-title'>Название</div>
                            <Input
                                value={tariff.name}
                                onChange={handleTariffNameChange}
                                className='tariffForm-input'
                                placeholder='Название тарифа'
                            />
                            <div className='tariffForm-title'>Описание</div>
                            <TextArea
                                value={tariff.description}
                                onChange={handleDescriptionChange}
                                className='tariffForm-description'
                                placeholder={'Описание для администратора'}
                                rows={3}
                            />
                            <div className='tariffForm-title'>Тип тарифа</div>
                            <RadioGroup name={'timeStrategy'} options={[
                                {title: 'Посуточный', value: 'daily'},
                                {title: 'Почасовой', value: 'hourly'}
                            ]}/>
                            <div className='tariffForm-title'>Категории номеров, для которых действует тариф</div>
                            <ul className='tariffForm-list'>
                                {roomTypes.map(rt => (
                                    <li key={rt.id} className='tariffForm-listItem'>
                                        <PlusIcon
                                            className='tariffForm-icon icon-20'
                                            onClick={() => handleRoomTypeCloseIconClick(rt)}
                                        />
                                        <span className='tariffForm-text'>{rt.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className='tariffForm-addItem'>+ Добавить в тариф категории</div>

                            <div className='tariffForm-title'>Дополнительные услуги</div>
                            <ul className='tariffForm-list'>
                                {extraServices.map(es => (
                                    <li key={es.id} className='tariffForm-listItem'>
                                        <PlusIcon
                                            className='tariffForm-icon icon-20'
                                            onClick={() => handleExtraServiceCloseIconClick(es)}
                                        />
                                        <span className='tariffForm-text'>{es.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className='tariffForm-addItem'>+ Добавить доп. услугу</div>
                        </Wrapper.Content>
                        <Wrapper.Footer>
                            <div className='tariffForm-buttons'>
                                <Button
                                    className='tariffForm-button'
                                    variant='regular'
                                    onClick={handleSaveButtonClick}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    className='tariffForm-button'
                                    variant="cancel"
                                    onClick={handeCancelButtonClick}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </Wrapper.Footer>
                    </Wrapper>
                </div>
            </div>
        </Modal>

    )
}

