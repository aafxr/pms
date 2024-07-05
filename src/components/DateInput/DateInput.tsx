import clsx from "clsx";
import DatePicker, {setDefaultLocale} from "react-datepicker";
import React, {ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useState, MouseEvent} from 'react';

import {Select, SelectOptionType} from "../Select";

import "react-datepicker/dist/react-datepicker.css";
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


setDefaultLocale(navigator.language.slice(0, 2))


export const DateInput = forwardRef<HTMLInputElement, DateInputPropsType>(({
                                                                               date,
                                                                               className,
                                                                               onDateChange,
                                                                               ...rest
                                                                           },
                                                                           ref
    ) => {
        const [select, setSelect] = useState<SelectOptionType>(dateSelectOptions[6])
        const [_date, setDate] = useState<Date | undefined>()


        useEffect(() => {
            if (date) {
                setDate(date)
            }
        }, [date]);


        function handleDayChange(d: Date | null) {
            if (d) {
                d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), select.id, 0, 0, 0)
                setDate(d)
                onDateChange?.(d)
                return
            }
            setDate(undefined)
        }


        function handleTimeChange(item: SelectOptionType) {
            setSelect(item)
            if (_date) {
                _date.setHours(item.id)
                _date.setMinutes(0)
                setDate(new Date(_date))
                onDateChange?.(_date)
            }
        }


        return (
            <div className={clsx('date', className)}>
                <div className='date-inner'>
                    <DatePicker
                        className='date-day'
                        selected={_date}

                        onSelect={handleDayChange}
                        onChange={handleDayChange}
                    />
                    <Select
                        className='date-time'
                        value={dateSelectOptions[_date?.getHours() || 6]}
                        items={dateSelectOptions}
                        onSelect={handleTimeChange}
                        maxSelectItems={5}
                    />

                </div>
                <input {...rest} className={'date-hidden'} type="date" value={_date?.getTime()} onChange={() => {
                }}/>
            </div>
        );
    }
)
