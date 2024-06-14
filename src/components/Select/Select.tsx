import clsx from "clsx";
import React, {forwardRef, SelectHTMLAttributes} from 'react';

import './Select.scss'


export interface SelectPropsType extends SelectHTMLAttributes<HTMLSelectElement> {}


export const  Select = forwardRef(({className, children, ...props}: SelectPropsType, ref) => {
    return (
        <select {...props} className={clsx('select', className)}>
            {children}
        </select>
    );
})

