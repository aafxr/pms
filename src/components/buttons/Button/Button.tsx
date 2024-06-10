import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import clsx from "clsx";

import './Button.css'


export interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
}


export const Button = forwardRef<HTMLButtonElement, ButtonPropsType>(
    ({className, children, ...props}: ButtonPropsType, ref) => {
        return (
            <button ref={ref} {...props} className={clsx('button', className)}>{children}</button>
        );
    }
)

