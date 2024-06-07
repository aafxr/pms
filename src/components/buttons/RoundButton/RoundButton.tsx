import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import clsx from "clsx";

import './RoundButton.css'


export interface RoundButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
}


export const RoundButton = forwardRef<HTMLButtonElement, RoundButtonPropsType>(({className, children}, ref) => {
    return (
        <button ref={ref} className={clsx('round-button', className)}>{children}</button>
    );
})

