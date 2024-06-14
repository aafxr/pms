import clsx from "clsx";
import React, {forwardRef, SelectHTMLAttributes} from 'react';

import './Select.scss'


export interface SelectPropsType extends SelectHTMLAttributes<HTMLSelectElement> {}


export const  Select = forwardRef<HTMLSelectElement, SelectPropsType>(({className, children, ...props}: SelectPropsType, ref) => {
    return (
        <select ref={ref} {...props} className={clsx('select', className)}>
            {children}
        </select>
    );
})

