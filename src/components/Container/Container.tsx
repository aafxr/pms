import clsx from "clsx";
import {PropsWithChildren} from "react";

import './Container.css'


export interface ContainerPropsType extends PropsWithChildren{
    className?: string
}


export function Container({
                              className,
                              children
}: ContainerPropsType){

    return (
        <div className={clsx('container', className)}>{children}</div>
    )
}