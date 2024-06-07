import clsx from "clsx";
import {Logo} from "../Logo";

import './Header.css'


export interface HeaderPropsType{
    className?: string
}


export function Header({className}: HeaderPropsType) {
    return (
        <div className={clsx('header', className)}>
            <Logo />
        </div>
    )
}