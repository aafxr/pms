import clsx from "clsx";
import {PropsWithChildren} from "react";

import '../Wrapper.css'

export interface ContentPropsType extends PropsWithChildren{
    className?: string
}

export function Content({className, children}: ContentPropsType){

    return (
        <div className={clsx('wrapper-content', className)}>{children}</div>
    )
}