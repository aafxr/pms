import clsx from "clsx";
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';

import {ChevronIcon} from "../svg";

import './CollapseContainer.scss'


export interface CollapseContainerPropsType extends PropsWithChildren {
    className?: string
}


export function CollapseContainer({className, children}: CollapseContainerPropsType) {
    const [open, setOpen] = useState(false)
    const collapseRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        calcCollapseHeight()
        setOpen(true)
    }, []);


    function handleButtonClick(){
        calcCollapseHeight()
        setOpen(!open)
    }

    const calcCollapseHeight = () => {
        const el = collapseRef.current
        if(!el) return
        if(open){
            el.style.maxHeight = '0'
        } else {
            el.style.maxHeight = el.scrollHeight + 'px'
        }
    }


    return (
        <div className={clsx('collapse', {open}, className)}>
            <button
                className='collapse-button'
                onClick={handleButtonClick}
            >
                <ChevronIcon className='collapse-icon icon-16'/>
            </button>
            <div
                ref={collapseRef}
                className='collapse-container'
            >
                {children}
            </div>
        </div>
    );
}

