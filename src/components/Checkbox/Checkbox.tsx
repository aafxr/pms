import React, {PropsWithChildren, useEffect, useState} from 'react';
import clsx from "clsx";
import {CheckIcon} from "../svg";

import './Checkbox.scss'


export interface CheckboxPropsType extends PropsWithChildren {
    className?: string
    checked?: boolean
    onChange?: (checked: boolean) => unknown
    name?: string
}


export function Checkbox({
                             className,
                             checked,
                             onChange,
                             name,
                             children
                         }: CheckboxPropsType) {
    const [_checked, setChecked] = useState(false)


    useEffect(() => {
        if (checked !== undefined && _checked !== checked) setChecked(checked)
    }, [checked]);


    function handleClick() {
        setChecked(!_checked)
        onChange?.(!_checked)
    }


    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>){
        const {keyCode} = e
        if(keyCode === 32 || keyCode === 13){
            handleClick()
        }
    }


    return (
        <div
            className={clsx('checkbox', className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className='checkbox-box'>
                {_checked && <CheckIcon className='Checkbox-iocn icon-16'/>}
            </div>
            <div className='checkbox-content'>{children}</div>

            <input
                type="checkbox"
                className='checkbox-input'
                name={name}
                checked={_checked}
                onChange={e => e.target.checked !== _checked && handleClick()}
            />
        </div>
    );
}
