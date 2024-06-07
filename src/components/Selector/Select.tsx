import clsx from "clsx";
import {PropsWithChildren, useRef} from "react";

import {useOutside} from "../../hooks";
import Items from "./Items/Items";
import Item from "./Items/Item";
import {Title} from "./Title";

import './Select.css'


export interface SelectPropsType extends PropsWithChildren{
    className?: string
    open?: boolean
    onClose?: () => unknown
}


function _Select({className, children, open, onClose}: SelectPropsType){
    const selectorRef = useRef<HTMLDivElement>(null)
    useOutside(selectorRef, () => onClose?.())


    return (
        <div ref={selectorRef} className={clsx('select', className, {open})}>
            {children}
        </div>
    )
}


export const Select = Object.assign(_Select, {Title, Items, Item})