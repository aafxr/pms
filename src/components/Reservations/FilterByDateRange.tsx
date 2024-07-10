import React from 'react';

import {FilterContainerComponent} from "./FilterContainerComponent";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Filter} from "../../core/classes/orders-filter";
import {DatePickerCustom} from "../DatePickerCustom";
import {PlusIcon} from "../svg";


export interface FilterByDateRangePropsType {
    filter: Filter<BookingItem>
    onChange?: (f: Filter<BookingItem>) => unknown
}


export function FilterByDateRange({
                                      filter,
                                      onChange
                                  }: FilterByDateRangePropsType) {


    return (
        <FilterContainerComponent title={'Бронирование'}>
            <div className='daterange'>
                <div className='daterange-inner'>
                    <div className='daterange-title'>title</div>

                    <div className='daterange-date'>
                        <div className='daterange-datepicker'>
                            <span className='daterange-legend'>с</span>
                            <DatePickerCustom
                                className='daterange-input'
                                onSelect={console.log}
                                onChange={console.log}
                                excludeScrollbar
                            />
                            <PlusIcon className='daterange-icon icon-20'/>
                        </div>
                    </div>

                    <div className='daterange-date'>
                        <div className='daterange-datepicker'>
                            <span className='daterange-legend'>по</span>
                            <DatePickerCustom
                                className='daterange-input'
                                onSelect={console.log}
                                onChange={console.log}

                                excludeScrollbar
                            />
                            <PlusIcon className='daterange-icon icon-20'/>
                        </div>
                    </div>
                </div>
            </div>

        </FilterContainerComponent>
    );
}
