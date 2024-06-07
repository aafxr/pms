import React, {PropsWithChildren} from 'react';
import clsx from "clsx";

import {Item} from "./Item";

import './Nav.css'



export interface NavPropsType extends PropsWithChildren{
    className?: string
    direction?: 'row' | 'column'
}


function _Nav({direction = 'row', className, children}: NavPropsType) {
    return (
        <nav className={clsx('nav', direction,  className)}>
            <ul className='nav-inner'>
                {children}
            </ul>
        </nav>
    );
}


export const Nav = Object.assign(_Nav, {Item});