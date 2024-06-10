import clsx from "clsx";
import React, {HTMLAttributes} from 'react';

import './Row.css'


export interface RowPropsType extends HTMLAttributes<HTMLDivElement> {
    justify?: 'start' | 'center' | 'end' | 'between' | 'stretch'
    align?: 'start' | 'center' | 'end' | 'stretch'
    full?: boolean
}

export function Row({
                        justify = 'start',
                        align = 'center',
                        className,
                        children,
                        full = false,
                        ...props
                    }: RowPropsType) {
    return (
        <div {...props}
             className={clsx('row', justify && `jc-${justify}`, align && `ai-${align}`, {full}, className)}>{children}</div>
    );
}
