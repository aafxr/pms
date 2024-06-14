import React, {forwardRef, InputHTMLAttributes} from 'react';
import clsx from "clsx";

import './Input.css'


export interface InputPropsType extends InputHTMLAttributes<HTMLInputElement> {
}


export const Input = forwardRef<HTMLInputElement, InputPropsType>(({className, ...props}, ref) => {
    return (
        <input ref={ref} {...props} className={clsx('input', className)}/>
    );
})

