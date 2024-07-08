import clsx from "clsx";
import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';

import {useOutside} from "../../hooks";
import {ChevronIcon} from "../svg";
import {Input} from "../Input";

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
    placeholder?: string
    name?: string
    onSelect?: (value: SelectOptionType) => unknown
}


export function Select({ref, value, className, items, placeholder, name, onSelect, maxSelectItems}: Select2PropsType) {
    const selectRef = useRef<HTMLDivElement>(null)
    const selectItemsRef = useRef<HTMLDivElement>(null)
    const [_value, setValue] = useState('')
    const [option, setOption] = useState<SelectOptionType | null>(null)
    const [open, setOpen] = useState(false)
    const itemsHeight = useRef(1)
    useOutside(selectRef, () => setOpen(false))


    useEffect(() => {
        const el = selectItemsRef.current
        if(!el) return

        const v = _value.toLowerCase()
        const idx = items.findIndex(i => i.value.toLowerCase().startsWith(v))
        const itemHeight = el.scrollHeight / items.length

        el.scrollTop = idx * itemHeight
    }, [items, _value]);



    useEffect(() => {
        if(value) {
            setOption(value)
            setValue(value?.value)
        }
    }, [value]);


    useEffect(() => {
        const el = selectItemsRef.current
        if (!el || maxSelectItems == undefined) return

        const item = el.querySelector('.select-item')
        if (!item) return

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



    function handleSelect(v: SelectOptionType) {
        setValue(v.value)
        setOption(v)
        setOpen(false)
        onSelect?.(v)
    }


    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        const text = e.target.value
        const item = items.find(e => e.value == text)
        if (item) {
            setValue(item.value)
            setOption(item)
            onSelect?.(item)
        }
    }

    function handleOptionKeydown(v: SelectOptionType, e: React.KeyboardEvent<HTMLDivElement>) {
        const {keyCode, shiftKey} = e
        if(keyCode === 13) handleSelect(v)
        if (keyCode === 38) {
            const prev = e.currentTarget.previousElementSibling as HTMLElement
            if(prev) prev.focus()
        }else if(keyCode === 40){
            const next = e.currentTarget.nextElementSibling as HTMLElement
            if(next) next.focus()
        } else if(keyCode === 27){
            e.stopPropagation()
            setOpen(false)
            selectRef.current?.dispatchEvent(new KeyboardEvent("keydown", {key: "Tab", shiftKey}))
        }
    }


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const text = e.target.value.trim()
        setValue(text)
    }


    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>){
        const {key} = e
        if(key == 'Escape'){
            setOpen(false)
            selectRef.current?.blur()
        }
    }


    return (
        <div
            ref={selectRef}
            className={clsx('select', {open}, className)}
            onKeyDown={handleKeyDown}
        >
            <div className='select-header' >
                <Input
                    className='select-header-input'
                    value={_value} placeholder={placeholder}
                    onChange={handleInputChange}
                    onFocus={() => setOpen(true)}
                />
                <ChevronIcon className='select-icon icon-16'/>
            </div>

            <div
                ref={selectItemsRef}
                className='select-items'
            >
                {items.map(item => (
                    <div
                        key={item.id}
                        className={clsx('select-item', item.id === option?.id && 'selected')}
                        onClick={() => handleSelect(item)}
                        onKeyDown={e => handleOptionKeydown(item, e)}
                        tabIndex={0}
                    >
                        {item.value}
                    </div>
                ))}
            </div>

            <select
                ref={ref}
                className='select-node'
                name={name}
                value={_value}
                onChange={handleSelectChange}
                tabIndex={0}
                onFocus={() => selectRef.current?.focus()}
            >
                <option value={'default'}>default</option>
            </select>
        </div>
    );
}

