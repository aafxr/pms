import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from 'react';
import clsx from "clsx";
import {RadioButtonIcon} from "../svg";

import './RadioButton.scss'


export interface CheckboxPropsType extends InputHTMLAttributes<HTMLInputElement>{
    title?: string
}


export function RadioButton({title, onChange,className, checked, ...props}: CheckboxPropsType) {
    const [check, setCheck] = useState(false)


    useEffect(() => {
        if(checked !== undefined) setCheck(checked )
    }, []);


    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setCheck(e.target.checked)
        onChange?.(e)
    }


    function handleClick(){
        setCheck(!check)
    }


    return (
        <div className={clsx('radioButton', className)} onClick={handleClick}>
            <RadioButtonIcon className='radioButton-icon icon-24' checked={check} />
            <div className='radioButton-title' >{title || ''}</div>

            <input {...props} className='radioButton-input'  type="radio" onChange={handleChange} checked={check} />
        </div>
    );
}

