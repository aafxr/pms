import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {ChevronIcon} from "../svg";


export interface FilterContainerComponentPropsType extends PropsWithChildren{
    open?: boolean
    onOpenChange?: (v: boolean) => unknown
}


export function FilterContainerComponent({ open, onOpenChange, children}:FilterContainerComponentPropsType) {
    const [_open, setOpen] = useState(false)
    const filterContainerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if(open !== undefined && open !== _open) setOpen(open)
    }, [open]);


    const calcHeight = (open: boolean) => {
        const el = filterContainerRef.current
        if(!el) return
        if(open) {
            el.style.maxHeight = el.offsetHeight + 'px'
        }else {
            el.style.maxHeight = '0'
        }
    }


    function handleHeaderClick(){
        calcHeight(!_open)
        setOpen(!_open)

    }



    return (
        <div className='reservation-filter'>
            <div className='reservation-filter-header'>
                <ChevronIcon className='reservation-filter-icon icon-16'/>
                <div className='reservation-filter-title'>Объекты</div>
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
