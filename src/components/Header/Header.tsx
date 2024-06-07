import clsx from "clsx";
import {useState} from "react";

import {Container} from "../Container";
import {Selector} from "../Selector";
import {Search} from "../Search";
import {Logo} from "../Logo";
import {Nav} from "../Nav";

import './Header.css'


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
                    <Selector open={open} onClose={() => setOpen(false)}>
                        <Selector.Title onClick={() => setOpen(!open)}>
                            Объекты размещения
                        </Selector.Title>
                        <Selector.Items>
                            <Selector.Item>1</Selector.Item>
                            <Selector.Item selected>2</Selector.Item>
                            <Selector.Item>3</Selector.Item>
                            <Selector.Item>4</Selector.Item>
                        </Selector.Items>
                    </Selector>

                    <Nav>
                        <Nav.Item to={'/deal'}>Сделки</Nav.Item>
                        <Nav.Item to={'/rate'}>Тарифы</Nav.Item>
                        <Nav.Item to={'/oreders'}>Заказы</Nav.Item>
                        <Nav.Item to={'/tasks'}>Задачи</Nav.Item>
                        <Nav.Item to={'/notification_MVD'}>Уведомления в МВД</Nav.Item>
                    </Nav>

                    <Search placeholder='Поиск по сервису' />

                </div>
            </Container>
        </div>
    )
}