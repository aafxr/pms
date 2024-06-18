import clsx from "clsx";
import React, {PropsWithChildren, useEffect, useRef} from 'react';

import {ChevronIcon} from "../svg";

import './Accordion.scss'


export interface AccordionPropsType extends PropsWithChildren {
    className?: string;
    title?: string;
    open?: boolean
    onOpenChanged?: (value: boolean) => void
}


export function Accordion({title, open, onOpenChanged, className, children}: AccordionPropsType) {
    const [isOpen, setOpen] = React.useState(false);
    const contentRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (open !== undefined && open !== isOpen) setOpen(open)
    }, [open]);


    useEffect(() => {
        handleAccordionState()

    }, [isOpen]);


    function handleAccordionState(){
        const el = contentRef.current
        if (!el) return
        if (isOpen) {
            el.style.maxHeight = el.scrollHeight + 28 + 'px'
        } else {
            el.style.maxHeight = 0 + 'px'
        }
    }


    function handleOpenChange() {
        const value = !isOpen
        setOpen(value)
        onOpenChanged?.(value)
        handleAccordionState()
    }


    return (
        <div className={clsx('accordion', {open: isOpen}, className)}>
            <div className='accordion-inner'>

                <div className='accordion-title' onClick={handleOpenChange}>
                    {title}
                    <div className='accordion-icon'>
                        <ChevronIcon className='icon-24'/>

                    </div>
                </div>
                <div ref={contentRef} className='accordion-content'>
                    {children}
                </div>
            </div>
        </div>
    );
}
