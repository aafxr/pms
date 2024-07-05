import clsx from "clsx";
import React, {ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useState, MouseEvent} from 'react';

import {Select, SelectOptionType} from "../Select";

import './DateInput.scss'


export interface DateInputPropsType extends InputHTMLAttributes<HTMLInputElement> {
    date?: Date
    onDateChange?: (d: Date) => unknown
}

const dateSelectOptions: SelectOptionType[] = new Array(24)
    .fill('')
    .map((_, i) => ({id: i, value: `${i < 10 ? `0${i}` : i}:00`}))


const d = new Date()
const defaultDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMonth())

export const DateInput = forwardRef<HTMLInputElement, DateInputPropsType>(({
                                                                               date,
                                                                               className,
                                                                               onDateChange,
                                                                           ...rest
},
ref
) =>
{
    const [dayValue, setDayValue] = useState('')
    const [timeValue, setTimeValue] = useState('')
    const [_date, setDate] = useState<Date>(defaultDate)


    useEffect(() => {
        if (date) {

            const [YY, MM, DD] = date.toISOString().slice(0, 10).split('-')
            const [hh, mm] = date.toISOString().slice(11, 16).split(':')

            setDayValue(`${DD}.${MM}.${YY}`)
            setTimeValue(`${hh}:${mm}`)
            setDate(date)
        }
    }, [date]);


    function handleDayChange(e: ChangeEvent<HTMLInputElement>) {
        const text = e.target.value.trim()
        setDayValue(text)
        if (/[0-3]?[0-9]\.[0-1]?[0-9]\.[1-2]\d{3}/.test(text)) {
            const [d, m, y] = text.split('.')
            _date.setFullYear(+y)
            _date.setMonth(+m)
            _date.setDate(+d)

            setDate(new Date(_date))
            onDateChange?.(_date)
        }

    }


    function handleTimeChange(item: SelectOptionType) {
        _date.setHours(item.id)
        _date.setMinutes(0)
        setDate(new Date(_date))
        onDateChange?.(_date)
    }


    return (
        <div className={clsx('date', className)}>
            <div className='date-inner'>
                <input
                    className='date-day'
                    type="text"
                    inputMode='numeric'
                    value={dayValue}
                    onChange={handleDayChange}
                    size={1}
                />
                <Select
                    className='date-time'
                    value={dateSelectOptions[_date.getHours()]}
                    items={dateSelectOptions}
                    onSelect={handleTimeChange}
                    maxSelectItems={5}
                />

            </div>
            <input {...rest} className={'date-hidden'} type="date" value={_date.getTime()}/>
        </div>
    );
}
)
