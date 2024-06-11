import clsx from "clsx";
import {PropsWithChildren, useEffect, useRef, useState} from "react";

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
    useOutside(selectorRef, () => {
        setIsOpen(false)
        onClose?.()
    })
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        if(open !== undefined) setIsOpen(open)
    }, [open]);


    return (
        <div
            ref={selectorRef}
            className={clsx('select', className, {open: isOpen})}
            onClick={() => setIsOpen(!isOpen)}
        >
            {children}
        </div>
    )
}


export const Select = Object.assign(_Select, {Title, Items, Item})