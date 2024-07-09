import React from 'react';

import {Filter, FilterByObjectType} from "../../core/classes/orders-filter";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Checkbox} from "../Checkbox";
import {ChevronIcon} from "../svg";


export interface ObjectTypeFilterPropsType {
    filter: Filter<BookingItem>
    onChange?: (f: Filter<BookingItem>) => unknown
}


export function ObjectTypeFilter({filter, onChange}: ObjectTypeFilterPropsType) {


    function handlePropertiesFilterChange(val: boolean, ot: BookingItem['object_type']) {
        let fp = filter.getFilter(1) as FilterByObjectType || new FilterByObjectType({id: 1, name: 'Основные объекты'})
        val
            ? fp.objectTypes.add(ot)
            : fp.objectTypes.delete(ot)

        const f = new Filter({filter})
        if (!fp.objectTypes.size) f.removeFilter(fp.id)
        else f.addFilter(fp)
        onChange?.(f)
    }


    return (
        <div className='reservation-filter'>
            <div className='reservation-filter-header'>
                <ChevronIcon className='reservation-filter-icon icon-16'/>
                <div className='reservation-filter-title'>Объекты</div>
            </div>

            <div className='reservation-filter-content'>
                <Checkbox
                    className='reservation-filter-checkbox'
                    onChange={v => handlePropertiesFilterChange(v, 'room')}
                >
                    Основные объекты
                </Checkbox>
                <Checkbox
                    className='reservation-filter-checkbox'
                    onChange={v => handlePropertiesFilterChange(v, 'extra')}
                >
                    Доп. объекты
                </Checkbox>
            </div>
        </div>
    );
}

