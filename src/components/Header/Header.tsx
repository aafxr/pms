import clsx from "clsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {BellIcon, GearIcon, PlusIcon, UserIcon} from "../svg";
import {Button, RoundButton} from "../buttons";
import {Container} from "../Container";
import {Select} from "../Selector";
import {Search} from "../Search";
import {Logo} from "../Logo";
import {Row} from "../flex";
import {Nav} from "../Nav";

import './Header.css'


export interface HeaderPropsType {
    className?: string
}


export function Header({className}: HeaderPropsType) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()


    function handleReservationButtonClick(){
        navigate('/reservation')
    }


    function handleSettingsButtonClick(){
        navigate('/settings/propertyList')
    }


    return (
        <div className={clsx('header', className)}>
            <Container>
                <div className='header-inner'>
                    <Row justify='between' align='center' full>
                        <div className='left gap-1'>
                            <Logo/>
                            <Select className='flex-0' open={open} onClose={() => setOpen(false)}>
                                <Select.Title onClick={() => setOpen(!open)}>
                                    Объекты размещения
                                </Select.Title>
                                <Select.Items>
                                    <Select.Item>1</Select.Item>
                                    <Select.Item selected>2</Select.Item>
                                    <Select.Item>3</Select.Item>
                                    <Select.Item>4</Select.Item>
                                </Select.Items>
                            </Select>

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
                                <RoundButton>
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