import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {ChevronIcon} from "../svg";
import clsx from "clsx";


export interface FilterContainerComponentPropsType extends PropsWithChildren {
    title?: string
    open?: boolean
    onOpenChange?: (v: boolean) => unknown
}


export function FilterContainerComponent({title, open, onOpenChange, children}: FilterContainerComponentPropsType) {
    const [_open, setOpen] = useState(false)
    const filterContainerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (open !== undefined && open !== _open) setOpen(open)
    }, [open]);


    useEffect(() => {
        calcHeight(_open)
    }, []);


    const calcHeight = (open: boolean) => {
        const el = filterContainerRef.current
        if (!el) return
        if (open) {
            el.style.maxHeight = el.scrollHeight + 'px'
        } else {
            el.style.maxHeight = '0'
        }
    }


    function handleHeaderClick() {
        calcHeight(!_open)
        setOpen(!_open)
        onOpenChange?.(!open)
    }


    return (
        <div className={clsx('reservation-filter', {open: _open})}>
            <div
                className='reservation-filter-header'
                onClick={handleHeaderClick}
            >
                <ChevronIcon className='reservation-filter-icon icon-16'/>
                <div className='reservation-filter-title'>{title}</div>
            </div>

            <div
                ref={filterContainerRef}
                className='reservation-filter-content'
            >
                {children}
            </div>
        </div>
    );
}
