import clsx from "clsx";
import {PropsWithChildren, useRef} from "react";

import Items from "./Items/Items";
import Item from "./Items/Item";
import {Title} from "./Title";

import './Selector.css'
import {useOutside} from "../../hooks";


export interface SelectorPropsType extends PropsWithChildren{
    className?: string
    open?: boolean
    onClose?: () => unknown
}


function _Selector({className, children, open, onClose}: SelectorPropsType){
    const selectorRef = useRef<HTMLDivElement>(null)
    useOutside(selectorRef, () => onClose?.())


    return (
        <div ref={selectorRef} className={clsx('selector', className, {open})}>
            {children}
        </div>
    )
}


export const Selector = Object.assign(_Selector, {Title, Items, Item})