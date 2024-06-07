import clsx from "clsx";
import React, {PropsWithChildren} from 'react';

import './Items.css'


export interface SelectorItemsPropsType extends PropsWithChildren{
    className?: string
}


function Items({className,children}:SelectorItemsPropsType) {
    return (
        <div className={clsx('select-items')}>
            {children}
        </div>
    );
}

export default Items;