import clsx from "clsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {BellIcon, GearIcon, PlusIcon, UserIcon} from "../svg";
import {Button, RoundButton} from "../buttons";
import {Container} from "../Container";
import {Select, SelectOptionType} from "../Select";
import {Search} from "../Search";
import {Logo} from "../Logo";
import {Row} from "../flex";
import {Nav} from "../Nav";

import './Header.css'
import {useAppContext} from "../../contexts/AppContextProvider";


export interface HeaderPropsType {
    className?: string
}


export function Header({className}: HeaderPropsType) {
    const navigate = useNavigate()
    const {setAppState, appState} = useAppContext()

    const {board, property} = appState
    const propertySelectOptions = Array.from(board?.properties.values() || []).map(el => ({id: el.id, value: el.name}))


    function handleReservationButtonClick(){
        navigate('/reservation')
    }


    function handleSettingsButtonClick(){
        navigate('/settings/companyList')
    }

    function handleProfileClick(){
        navigate('/profile')
    }


    function selectProperty(v: SelectOptionType){
        if(!board) return
        const p = board.properties.get(v.id)
        if(p){
            setAppState({...appState, property: p})
        }
    }


    return (
        <div className={clsx('header', className)}>
            <Container>
                <div className='header-inner'>
                    <Row justify='between' align='center' full wrap>
                        <div className='left gap-1'>
                            <Logo/>
                            <Select
                                className='header-select'
                                value={propertySelectOptions.find(el => el.id === property?.id)}
                                items={propertySelectOptions}
                                onSelect={selectProperty}
                            />
                            <Nav>
                                <Nav.Item to={'/deal'}>Сделки</Nav.Item>
                                <Nav.Item to={'/rate'}>Тарифы</Nav.Item>
                                <Nav.Item to={'/orders'}>Заказы</Nav.Item>
                                <Nav.Item to={'/tasks'}>Задачи</Nav.Item>
                                <Nav.Item to={'/notification_MVD'}>Уведомления в МВД</Nav.Item>
                            </Nav>
                            <Button
                                className='reservation'
                                onClick={handleReservationButtonClick}
                            >
                                Добавить бронь
                                <div className='icon'>
                                    <PlusIcon className='icon-24' />
                                </div>
                            </Button>
                        </div>
                        <div className='right gap-1'>
                            <Search size={1} placeholder='Поиск по сервису'/>
                            <Row>
                                <RoundButton>
                                    <BellIcon className='icon-24'/>
                                </RoundButton>
                                <RoundButton onClick={handleSettingsButtonClick}>
                                    <GearIcon className='icon-24'/>
                                </RoundButton>
                                <RoundButton onClick={handleProfileClick}>
                                    <UserIcon className='icon-24'/>
                                </RoundButton>
                            </Row>
                        </div>
                    </Row>

                </div>
            </Container>
        </div>
    )
}