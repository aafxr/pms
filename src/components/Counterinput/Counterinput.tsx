import clsx from "clsx";
import React, {useEffect, useState} from 'react';

import {MinusIcon, PlusIcon} from "../svg";
import {Input} from "../Input";

import './CounterInput.css'

export interface CounterInputPropsType {
    className?: string
    placeholder?: string
    value?: number
    onChange?: (value: number) => unknown
}

export function CounterInput({className, placeholder, value, onChange}: CounterInputPropsType) {
    const [count, setCount] = useState(0)


    useEffect(() => {
        if (value !== undefined && value !== count) setCount(value)
    }, [value]);


    function handleInputChange(e: React.KeyboardEvent<HTMLInputElement>) {
        const el = e.target as HTMLInputElement
        const val = +el.value
        if (!isNaN(val) && count != val) {
            setCount(val)
            onChange?.(val)
        }
    }


    function handleMinusClick() {
        setCount(count - 1)
        onChange?.(count - 1)
    }

    function handlePlusClick() {
        setCount(count + 1)
        onChange?.(count + 1)
    }


    return (
        <div className={clsx('counter', className)}>
            <Input value={count} onInput={handleInputChange} size={1}/>
            <div
                className='counter-button minus'
                onClick={handleMinusClick}
            >
                <MinusIcon className='icon-16'/>
            </div>
            <div
                className='counter-button plus'
                onClick={handlePlusClick}
            >
                <PlusIcon className='icon-16'/>
            </div>
        </div>
    );
}
