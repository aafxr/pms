import clsx from "clsx";
import {useState} from "react";

import {Container} from "../Container";
import {Selector} from "../Selector";
import {Logo} from "../Logo";

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
                            selector
                        </Selector.Title>
                        <Selector.Items>
                            <Selector.Item>1</Selector.Item>
                            <Selector.Item selected>2</Selector.Item>
                            <Selector.Item>3</Selector.Item>
                            <Selector.Item>4</Selector.Item>
                        </Selector.Items>
                    </Selector>

                </div>
            </Container>
        </div>
    )
}