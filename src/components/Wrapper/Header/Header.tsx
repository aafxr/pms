import clsx from "clsx";
import {PropsWithChildren} from "react";

import './Header.css'


export interface HeaderPropsType extends PropsWithChildren{
    className?: string
}

export function Header({className,children}: HeaderPropsType){
    return (
        <div className={clsx('w-header', className)}>{children}</div>
    )
}