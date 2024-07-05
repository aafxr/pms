import clsx from "clsx";
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';

import {useOutside} from "../../hooks";
import {ChevronIcon} from "../svg";

import './Select.scss'


export type SelectOptionType = {
    id: number,
    value: string
}


export interface Select2PropsType {
    ref?: React.Ref<HTMLSelectElement>
    className?: string
    value?: SelectOptionType
    items: SelectOptionType[]
    maxSelectItems?: number
    title?: string
    name?: string
    onSelect?: (value: SelectOptionType) => unknown
}


export function Select({ref, value, className, items, title, name, onSelect, maxSelectItems}: Select2PropsType) {
    const selectRef = useRef<HTMLDivElement>(null)
    const selectItemsRef = useRef<HTMLDivElement>(null)
    const [_value, setValue] = useState<SelectOptionType>()
    const [open, setOpen] = useState(false)
    const itemsHeight = useRef(1)
    useOutside(selectRef, () => setOpen(false))


    useEffect(() => {
        setValue(value)
    }, [value]);


    useEffect(() => {
        const el = selectItemsRef.current
        if(!el || maxSelectItems == undefined) return

        const item  = el.querySelector('.select-item')
        if(!item) return

        const rect = item.getBoundingClientRect()
        itemsHeight.current = rect.height

    }, []);


    useEffect(() => {
        const itemsEl = selectItemsRef.current
        if (itemsEl) {
            open
                ? itemsEl.style.maxHeight = maxSelectItems !== undefined
                    ? itemsHeight.current * maxSelectItems + 2 + 'px'
                    : itemsEl.scrollHeight + 2 + 'px'
                : itemsEl.style.maxHeight = '0'
        }
    }, [open]);


    function handleSelectHeaderClick() {
        setOpen(!open)
    }


    function handleSelect(v: SelectOptionType){
        setValue(v)
        setOpen(false)
        onSelect?.(v)
    }


    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>){
        const text = e.target.value
        const item = items.find(e => e.value == text)
        if(item) {
            setValue(item)
            onSelect?.(item)
        }

    }


    return (
        <div ref={selectRef} className={clsx('select', {open}, className)}>
            <div className='select-header' onClick={handleSelectHeaderClick}>
                {_value?.value || title}
                <ChevronIcon className='select-icon icon-16'/>
            </div>

            <div
                ref={selectItemsRef}
                className='select-items'
            >
                {items.map(item => (
                    <div
                        key={item.id}
                        className={clsx('select-item', item.id === _value?.id && 'selected')}
                        onClick={() => handleSelect(item)}
                    >
                        {item.value}
                    </div>
                ))}
            </div>

            <select ref={ref} className='select-node' name={name} value={_value?.value} onChange={handleSelectChange}></select>
        </div>
    );
}

