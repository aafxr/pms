import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {ChevronIcon} from "../svg";

import './Accordion.scss'
import clsx from "clsx";


export interface AccordionPropsType extends PropsWithChildren {
    className?: string;
    title?: string;
    open?:boolean
}


export function Accordion({title,open, className, children}: AccordionPropsType) {
    const [isOpen, setOpen] = React.useState(false);
    const contentRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if(open!== undefined && open !== isOpen) setOpen(open)
    }, [open]);


    useEffect(() => {
        const el = contentRef.current
        if(!el) return

        if(isOpen){
            el.style.maxHeight = el.scrollHeight + 'px'
        }else {
            el.style.maxHeight = 0 + 'px'
        }

    }, [isOpen]);


    return (
        <div className={clsx('accordion', {open: isOpen}, className)}>
            <div className='accordion-inner'>

                <div className='accordion-title' onClick={() => setOpen(!isOpen)}>
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
