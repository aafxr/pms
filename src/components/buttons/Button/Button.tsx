import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import clsx from "clsx";

import './Button.css'


export interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'active' | 'regular' | 'cancel' | 'bgTransparent'
}


export const Button = forwardRef<HTMLButtonElement, ButtonPropsType>(
    ({className, children, variant = 'regular', ...props}: ButtonPropsType, ref) => {
        const cn = clsx('button',
            {
                [variant]: true
            }
            , className)
        return (
            <button ref={ref} {...props} className={cn}>{children}</button>
        );
    }
)

