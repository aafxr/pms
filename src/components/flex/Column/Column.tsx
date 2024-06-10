import clsx from "clsx";
import React, {HTMLAttributes} from 'react';

import './Column.css'


export interface ColumnPropsType extends HTMLAttributes<HTMLDivElement> {
    justify?: 'start' | 'center' | 'end' | 'between' | 'stretch'
    align?: 'start' | 'center' | 'end' | 'stretch'
}


export function Column({
                           justify = 'start',
                           align = 'start',
                           className,
                           ...props
                       }: ColumnPropsType) {
    return (
        <div {...props} className={clsx('column', justify && `jc-${justify}`, align && `ai-${align}`, className)}></div>
    );
}
