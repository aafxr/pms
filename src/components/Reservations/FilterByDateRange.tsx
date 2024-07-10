import React, {PropsWithChildren} from 'react';

import {FilterContainerComponent} from "./FilterContainerComponent";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Filter} from "../../core/classes/orders-filter";
import {DatePickerCustom} from "../DatePickerCustom";
import {PlusIcon} from "../svg";


export interface FilterByDateRangePropsType extends PropsWithChildren{
    filter:Filter<BookingItem>
    onChange?: (f: Filter<BookingItem>) => unknown
}


export function FilterByDateRange({children}: FilterByDateRangePropsType) {
    return (
        <FilterContainerComponent title={'Бронирование'}>
            <div className='oreder-drf drf'>
                <div className={'drf-title'}></div>
                <div className='drf-from'>
                    <span className='drf-legend'>с</span>
                    <div className='drf-date'>
                        <DatePickerCustom onSelect={console.log} onChange={console.log} excludeScrollbar={{}}/>
                        <PlusIcon className='drf-icon icon-20'/>
                    </div>
                </div>

                <div className='drf-to'>
                    <span className='drf-legend'>по</span>
                    <div className='drf-date'>
                        <DatePickerCustom onSelect={console.log} onChange={console.log} excludeScrollbar={{}}/>
                        <PlusIcon className='drf-icon icon-20'/>
                    </div>
                </div>
            </div>

        </FilterContainerComponent>
    );
}
