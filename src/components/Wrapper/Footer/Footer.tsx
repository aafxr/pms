import clsx from "clsx";
import {PropsWithChildren} from "react";

import './Footer.css'

export interface FooterPropsType extends PropsWithChildren{
    className?: string
}


export function Footer({className,children}: FooterPropsType){
    return (
        <div className={clsx('w-footer', className)}>{children}</div>
    )
}