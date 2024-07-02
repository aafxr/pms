import React from 'react';
import clsx from "clsx";

import {RoundButton} from "../RoundButton";
import {ChevronIcon} from "../../svg";

import './NavButtons.css'


export interface NavButtonsPropsType{
    className?:string
    onPrev?: () => unknown
    onNext?: () => unknown
    prevDisabled?: boolean
    nextDisabled?: boolean
}


function NavButtons({onPrev, onNext, className, prevDisabled, nextDisabled}: NavButtonsPropsType) {
    return (
        <div className={clsx('nav-buttons', className)}>
            <RoundButton
                className='left'
                onClick={onPrev}
                disabled={prevDisabled}
            >
                <ChevronIcon className='icon icon-20' />
            </RoundButton>
            <RoundButton
                className='right'
                onClick={onNext}
                disabled={nextDisabled}
            >
                <ChevronIcon className='icon icon-20' />
            </RoundButton>
        </div>
    );
}

export default NavButtons;