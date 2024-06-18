import React, {PropsWithChildren, TransitionEvent, useEffect} from 'react';
import {createPortal} from "react-dom";
import clsx from "clsx";

import './Modal.scss'


export interface ModalPropsType extends PropsWithChildren {
    className?: string;
    open?:boolean
    onClose?: () => void
}


export function Modal({className, open, onClose, children}: ModalPropsType) {


    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {document.removeEventListener("keydown", handleKeyDown)}
    }, []);


    function handleKeyDown(e: KeyboardEvent){
        const {code} = e
        if(code === 'Escape'){
            onClose?.()
        }
    }


    function handleModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        const el = e.target;
        const curentEl = e.currentTarget

        if(el && el instanceof HTMLDivElement){
            if(el.classList.contains('modal-backplate')) {
                curentEl.classList.remove('open')
                curentEl.classList.add('close')
            }
        }
    }


    function handleTransitionEnd(e: TransitionEvent<HTMLDivElement>){
        const el = e.currentTarget;
        if(el.classList.contains('close')) {
            onClose?.()
        }
    }


    if(!open) return null;


    return createPortal(
        <div
            className={clsx('modal open', className)}
            onClick={handleModalClick}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className='modal-backplate'/>
            <div className='modal-content'>{children}</div>
        </div>,
        document.body
    );
}

