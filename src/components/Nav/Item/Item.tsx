import clsx from "clsx";
import {NavLink} from "react-router-dom";
import React, {HTMLAttributes, PropsWithChildren} from 'react';

import './Item.css'


export interface NavItemPropsType extends PropsWithChildren, HTMLAttributes<HTMLLIElement>{
    className?: string
    to: string
}


export function Item({className, to, children, ...props}: NavItemPropsType) {
    return (
        <li {...props} className={clsx('nav-item', className)}>
            <NavLink to={to} className={({isActive}) => clsx('nav-item-inner', {active: isActive})}>
                {children}
            </NavLink>
        </li>
    );
}

