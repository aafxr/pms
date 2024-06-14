import clsx from "clsx";
import React, {HTMLAttributes, PropsWithChildren} from 'react';

import './Item.css'


export interface SelectorItemPropsType extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    className?: string
    selected?: boolean
}


function Item({className, children, selected, ...props}: SelectorItemPropsType) {
    return (
        <div
            {...props}
            className={clsx('select-item', className, {selected})}
        >{children}</div>
    );
}

export default Item;