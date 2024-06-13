import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import clsx from "clsx";

import './RoundButton.css'


export interface RoundButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
}


/**
 * круглая кнопка
 */
export const RoundButton = forwardRef<HTMLButtonElement, RoundButtonPropsType>(({className, children, ...props}, ref) => {
    return (
        <button {...props} ref={ref} className={clsx('round-button', className)}>{children}</button>
    );
})

