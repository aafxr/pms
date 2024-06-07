import clsx from "clsx";
import {PropsWithChildren} from "react";

import './Content.css'

export interface ContentPropsType extends PropsWithChildren{
    className?: string
}

export function Content({className, children}: ContentPropsType){

    return (
        <div className={clsx('w-content', className)}>{children}</div>
    )
}