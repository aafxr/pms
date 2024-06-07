import clsx from "clsx";
import React, {HTMLAttributes, PropsWithChildren} from 'react';

import './Title.css'
import {ChevronIcon} from "../../svg";


export interface SelectorTitlePropsType extends PropsWithChildren, HTMLAttributes<HTMLDivElement>{
    className?: string
    chevron?: boolean
}


export function Title({className, children, chevron = true, ...props}: SelectorTitlePropsType) {




    return (
        <div {...props} className={clsx('selector-title', className)}>
            {children}
            {chevron && <ChevronIcon className='icon' /> }
        </div>
    );
}

