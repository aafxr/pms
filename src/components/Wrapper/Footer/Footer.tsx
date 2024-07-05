import clsx from "clsx";
import {PropsWithChildren} from "react";

import '../Wrapper.css'

export interface FooterPropsType extends PropsWithChildren{
    className?: string
}


export function Footer({className,children}: FooterPropsType){
    return (
        <div className={clsx('wrapper-footer', className)}>{children}</div>
    )
}