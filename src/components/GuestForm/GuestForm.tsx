import React, {useEffect, useMemo, useState} from 'react';

import {useAppContext} from "../../contexts/AppContextProvider";
import {CollapseContainer} from "../CollapseContainer";
import {DatePickerCustom} from "../DatePickerCustom";
import {Guest} from "../../core/classes/v1/Guest";
import {FileInput} from "../FileInput";
import {Select} from "../Select";
import {PlusIcon} from "../svg";
import {Input} from "../Input";

import './GuestForm.scss'


export interface GuestFormPropsType {
    onDelete?: (guest?: Guest) => unknown
    onChange?: (guest: Guest) => unknown
}


export function GuestForm({onChange, onDelete}: GuestFormPropsType) {
    const {appState} = useAppContext()
    const {board} = appState
    const [state, setState] = useState<Guest>()
    const validation = state?.validate()
    const persons = Array.from(board?.persons.values() || [])

    const selectPersons = useMemo(() => {
        return persons
            .map(p => ({id: p.id, value: p.fullName}))
            .sort((a, b) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0)
    }, [board])


    useEffect(() => {
        if (state) onChange?.(state)
    }, [state]);


    function handleDeleteGuest() {
        onDelete?.(state)
    }


    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!board) return
        const g = new Guest(state)
        g.first_name = e.target.value.trim()
        setState(g)
    }


    function handleMiddleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!board) return
        const g = new Guest(state)
        g.middle_name = e.target.value.trim()
        setState(g)
    }


    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!board) return
        const g = new Guest(state)
        g.last_name = e.target.value.trim()
        setState(g)
    }


    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!board) return
        const g = new Guest(state)
        g.phoneNumber = e.target.value.trim()
        setState(g)
    }


    function handleEMailChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!board) return
        const g = new Guest(state)
        g.email = e.target.value.trim()
        setState(g)
    }




    return (
        <div className="guestForm">
            <div className='guestForm-container'>
                <button
                    className='guestForm-removeGuest'
                    onClick={handleDeleteGuest}
                >
                    <PlusIcon className='guestForm-close-icon icon-20'/>
                </button>
                <div className='guestForm-content'>
                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-stretch">
                                <div className="guestForm-title">Гость 1</div>
                                <Select
                                    className="guestForm-select"
                                    items={selectPersons}
                                    maxSelectItems={5}
                                    onSelect={p => board && setState(new Guest(board.persons.get(p.id)))}
                                />
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option">
                                <div className="guestForm-title">Фамилия*</div>
                                <Input className="guestForm-input" value={state?.last_name}
                                       onChange={handleLastNameChange}/>
                                <div className="guestForm-message">{validation?.last_name}</div>
                            </div>

                            <div className="guestForm-option">
                                <div className="guestForm-title">Имя*</div>
                                <Input className="guestForm-input" value={state?.first_name}
                                       onChange={handleFirstNameChange}/>
                                <div className="guestForm-message">{validation?.first_name}</div>
                            </div>

                            <div className="guestForm-option">
                                <div className="guestForm-title">Отчество</div>
                                <Input className="guestForm-input" value={state?.middle_name}
                                       onChange={handleMiddleNameChange}/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <div className="guestForm-block">
                        <div className="guestForm-options">
                            <div className="guestForm-option guestForm-option-phone">
                                <div className="guestForm-title">Телефон*</div>
                                <Input type='tel' className="guestForm-input" value={state?.phone}
                                       onChange={handlePhoneChange}/>
                                <div className="guestForm-message">{validation?.phone}</div>
                            </div>

                            <div className="guestForm-option guestForm-option-email">
                                <div className="guestForm-title">Эл. почта</div>
                                <Input type='email' className="guestForm-input" value={state?.email}
                                       onChange={handleEMailChange}/>
                                <div className="guestForm-message"></div>
                            </div>
                        </div>
                    </div>

                    <CollapseContainer className='guestForm-collapse'>
                        <div className="guestForm-block guestForm-block-cf">
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
                    </CollapseContainer>
                </div>
            </div>
        </div>
    );
}
