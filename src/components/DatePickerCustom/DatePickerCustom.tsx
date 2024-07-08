import clsx from "clsx";
import React from 'react';
import DatePicker, {DatePickerProps} from "react-datepicker";

import './DatePickerCustom.scss'


export function DatePickerCustom(props: DatePickerProps) {
    return (
        <DatePicker {...props} className={clsx('datepicker-custom', props.className)}/>
    );
}

