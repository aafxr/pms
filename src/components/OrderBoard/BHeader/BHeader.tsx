import React from 'react';

import {BFilter} from "./BFilter/BFilter";


function BHeader() {
    return (
        <div className='b-header'>
            <BFilter />
            <div className='property'>Отель «Эрмитаж»</div>
            <div className='month'>
                {new Date().toLocaleDateString(navigator.language, {month: "long"})}
            </div>
        </div>
    );
}

export default BHeader;