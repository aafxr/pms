import React, {useState} from 'react';

import './Select2.scss'
import clsx from "clsx";
import {ChevronIcon} from "../svg";


export type SelectOptionType = {
    id: number,
    value: string
}


export interface Select2PropsType {
    ref?: React.Ref<HTMLSelectElement>
    className?: string
    items: SelectOptionType[]
    title?: string
    name?: string
    onSelect?: (value: SelectOptionType) => unknown
}


export function Select2({ref, className, items, title, name, onSelect}: Select2PropsType) {
    const [value, setValue] = useState<SelectOptionType>()
    return (
        <div className={clsx('select', className)}>
            <div className='select-header'>
                {title}
                <ChevronIcon className='select-icon icon-16' />
            </div>
            <div className='select-items'>
                {items.map(item => (
                    <div key={item.id} className='select-item'>{item.value}</div>
                ))}
            </div>
            <select className='select-node' name={name} value={value?.value}></select>
        </div>
    );
}

