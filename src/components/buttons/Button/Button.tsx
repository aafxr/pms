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
                "button-active": variant == 'active',
                "button-regular": variant == 'regular',
                "button-cancel": variant == 'cancel',
                "button-bgTransparent": variant == 'bgTransparent',
            }
            , className)
        return (
            <button ref={ref} {...props} className={cn}>{children}</button>
        );
    }
)

