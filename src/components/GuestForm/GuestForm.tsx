import React, {useMemo} from 'react';

import {useAppContext} from "../../contexts/AppContextProvider";
import {DatePickerCustom} from "../DatePickerCustom";
import {Person} from "../../core/classes/v1/Person";
import {FileInput} from "../FileInput";
import {Select} from "../Select";
import {PlusIcon} from "../svg";
import {Input} from "../Input";

import './GuestForm.scss'


export interface GuestFormPropsType {
    onDelete?: () => unknown
    onChange?: (guest: Person) => unknown
}


export function GuestForm() {
    const {appState} = useAppContext()
    const {board} = appState
    const persons = Array.from(board?.persons.values() || [])
    const selectPersons = useMemo(() => {
        return persons
            .map(p => ({id: p.id, value: p.fullName}))
            .sort((a, b) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0)
    }, [board])

    return (
        <div className="guestForm">
            <div className='guestForm-container'>
                <button className='guestForm-removeGuest '>
                    <PlusIcon className='guestForm-close-icon icon-20'/>
                </button>
                <div className='guestForm-content'>
                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-stretch">
                                <div className="guestForm-title">Гость 1</div>
                                <Select className="guestForm-select" items={selectPersons} maxSelectItems={5}/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option">
                                <div className="guestForm-title">Фамилия*</div>
                                <Input className="guestForm-input"/>
                                <div className="guestForm-message"></div>
                            </div>

                            <div className="guestForm-option">
                                <div className="guestForm-title">Имя*</div>
                                <Input className="guestForm-input"/>
                                <div className="guestForm-message"></div>
                            </div>

                            <div className="guestForm-option">
                                <div className="guestForm-title">Отчество</div>
                                <Input className="guestForm-input"/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-phone">
                                <div className="guestForm-title">Телефон*</div>
                                <Input type='tel' className="guestForm-input"/>
                                <div className="guestForm-message"></div>
                            </div>

                            <div className="guestForm-option guestForm-option-email">
                                <div className="guestForm-title">Эл. почта</div>
                                <Input type='email' className="guestForm-input"/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-stretch">
                                <div className="guestForm-title">Тип документа</div>
                                <Select className="guestForm-select" items={[]}/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-seria">
                                <div className="guestForm-title">Серия</div>
                                <Input inputMode='numeric' className="guestForm-input guestForm-input-seria"/>
                                <div className="guestForm-message"></div>
                            </div>

                            <div className="guestForm-option guestForm-option-number">
                                <div className="guestForm-title">Номер</div>
                                <Input inputMode='numeric'
                                       className="guestForm-input guestForm-input-docNumber"/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-issued">
                                <div className="guestForm-title">Кем выдан</div>
                                <Input className="guestForm-input guestForm-input-seria"/>
                                <div className="guestForm-message"></div>
                            </div>

                            <div className="guestForm-option">
                                <div className="guestForm-title">Дата выдачи</div>
                                <DatePickerCustom
                                    className="guestForm-date"
                                    selected={new Date()}
                                    onChange={console.log}
                                    onSelect={console.log}
                                    excludeScrollbar={{}}
                                />
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-file">
                                <div className="guestForm-title">Вложения</div>
                                <FileInput
                                    className="guestForm-input"
                                    placeholder='Прикрепите здесь сканы, справки или иные документы'
                                />
                                <div className="guestForm-message">PNG, JPEG, PDF</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
