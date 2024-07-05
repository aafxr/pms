import clsx from "clsx";
import {PropsWithChildren} from "react";

import '../Wrapper.css'


export interface HeaderPropsType extends PropsWithChildren{
    className?: string
}

export function Header({className,children}: HeaderPropsType){
    return (
        <div className={clsx('wrapper-header', className)}>{children}</div>
    )
}