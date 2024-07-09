import React from 'react';
import {ChevronIcon} from "../svg";
import {Filter, FilterByRentStrategy} from "../../core/classes/orders-filter";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Checkbox} from "../Checkbox";


export interface TimeStrategyFilterPropsType {
    filter: Filter<BookingItem>
    onChange?: (f: Filter<BookingItem>) => unknown
}


export function TimeStrategyFilter({filter, onChange}: TimeStrategyFilterPropsType) {


    function handleTimeStrategyFilterChange(val: boolean, ts: BookingItem['type']) {
        let fp = filter.getFilter(3) as FilterByRentStrategy || new FilterByRentStrategy({id: 3, name: 'strategy'})
        ts === 'daily'
            ? fp.daily = val
            : fp.hourly = val
        const f = new Filter({filter})
        if (!fp.daily && !fp.hourly) f.removeFilter(fp.id)
        else f.addFilter(fp)
        onChange?.(f)
    }


    return (
        <div className='reservation-filter'>
            <div className='reservation-filter-header'>
                <ChevronIcon className='reservation-filter-icon icon-16'/>
                <div className='reservation-filter-title'>Время</div>
            </div>

            <div className='reservation-filter-content'>
                <Checkbox
                    className='reservation-filter-checkbox'
                    onChange={v => handleTimeStrategyFilterChange(v, 'hourly')}
                >
                    Час
                </Checkbox>
                <Checkbox
                    className='reservation-filter-checkbox'
                    onChange={v => handleTimeStrategyFilterChange(v, 'daily')}
                >
                    Сутки
                </Checkbox>
            </div>
        </div>
    );
}
