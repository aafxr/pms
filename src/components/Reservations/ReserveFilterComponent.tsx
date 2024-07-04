import React from 'react';
import {ChevronIcon} from "../svg";


export type ReserveFilterComponentPropsType = {}


function ReserveFilterComponent({}: ReserveFilterComponentPropsType) {
    function handlePropertiesFilterChange(){

    }

    function handleExtraPropertiesFilterChange(){

    }

    return (
        <div className='reservation-filter'>
            <div className='reservation-filter-header'>
                <ChevronIcon className='reservation-filter-icon icon-16'/>
                <div className='reservation-filter-title'>Объекты</div>
            </div>

            <div className='reservation-filter-content'>
                <label className='reserfation-filter-label' htmlFor="properties">
                    <input type="checkbox" id='properties' onChange={handlePropertiesFilterChange}/>
                    Основные объекты
                </label>
                <label className='reserfation-filter-label' htmlFor={'extra-properties'}>
                    <input type="checkbox" id='extra-properties'
                           onChange={handleExtraPropertiesFilterChange}/>
                    Доп. объекты
                </label>
            </div>
        </div>
    );
}

