import clsx from "clsx";
import {useState} from "react";

import {Container} from "../Container";
import {Select} from "../Selector";
import {Search} from "../Search";
import {Logo} from "../Logo";
import {Nav} from "../Nav";

import './Header.css'
import {RoundButton} from "../buttons";
import {BellIcon, GearIcon, UserIcon} from "../svg";


export interface HeaderPropsType {
    className?: string
}


export function Header({className}: HeaderPropsType) {
    const [open, setOpen] = useState(false)

    return (
        <div className={clsx('header', className)}>
            <Container >
                <div className='header-inner'>
                    <Logo/>
                    <Select open={open} onClose={() => setOpen(false)}>
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
                        <Nav.Item to={'/oreders'}>Заказы</Nav.Item>
                        <Nav.Item to={'/tasks'}>Задачи</Nav.Item>
                        <Nav.Item to={'/notification_MVD'}>Уведомления в МВД</Nav.Item>
                    </Nav>

                    <Search placeholder='Поиск по сервису' />
                    <RoundButton>
                        <BellIcon className='icon-24' />
                    </RoundButton>
                    <RoundButton>
                        <GearIcon className='icon-24' />
                    </RoundButton>
                    <RoundButton>
                        <UserIcon className='icon-24' />
                    </RoundButton>

                </div>
            </Container>
        </div>
    )
}