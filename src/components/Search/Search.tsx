import clsx from "clsx";
import React, {InputHTMLAttributes, RefObject} from 'react';

import {Input} from "../Input";
import {SearchIcon} from "../svg";

import './Search.css'


export interface SearchPropsType extends InputHTMLAttributes<HTMLInputElement>{
    inputRef?: RefObject<HTMLInputElement>
}


export function Search({className, inputRef, ...props}: SearchPropsType) {
    return (
        <div className={clsx('search', className)}>
            <Input ref={inputRef} {...props} />
            <SearchIcon className='icon-24' />
        </div>
    );
}

