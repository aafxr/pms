import React from 'react';
import clsx from "clsx";

import {RoundButton} from "../RoundButton";
import {ChevronIcon} from "../../svg";

import './NavButtons.css'


export interface NavButtonsPropsType{
    className?:string
    onPrev?: () => unknown
    onNext?: () => unknown
}


function NavButtons({onPrev, onNext, className}: NavButtonsPropsType) {
    return (
        <div className={clsx('nav-buttons', className)}>
            <RoundButton className='left' onClick={() => onPrev?.()}>
                <ChevronIcon className='icon icon-20' />
            </RoundButton>
            <RoundButton className='right' onClick={() => onNext?.()}>
                <ChevronIcon className='icon icon-20' />
            </RoundButton>
        </div>
    );
}

export default NavButtons;