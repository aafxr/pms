import clsx from "clsx";
import React, {HTMLAttributes} from 'react';

import './Blank.css'


export interface BlankPropsType extends HTMLAttributes<HTMLDivElement>{}


export function Blank({className, children, ...props}: BlankPropsType) {
    return (
        <div {...props} className={clsx('blank', className)}>
            {children}
        </div>
    );
}
