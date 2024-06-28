import React from 'react';
import clsx from "clsx";


export type ScrollbarPropsType = {
    variant?: 'vertical' | 'horizontal'
    /** значение от 0 - до 1 */
    value?: number
}


function Scrollbar({variant, value}: ScrollbarPropsType) {
    const cn = clsx('scrollbar', `scrollbar-${variant}`)
    return (
        <div
            className={cn}
        />
    );
}
