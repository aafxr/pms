import clsx from "clsx";
import React, {useEffect, useState} from 'react';

import {Button} from "../Button";

import './ButtonsGroup.css'


export type ButtonGroupType = {
    id: number
    name: string
}


export interface ButtonsGroupPropsType {
    className?: string
    select?: ButtonGroupType['id']
    buttons: ButtonGroupType[]
    onClick?: (btn: ButtonGroupType) => unknown
}


export function ButtonsGroup({buttons = [], select, className, onClick}: ButtonsGroupPropsType) {
    const [selected, setSelected] = useState<ButtonGroupType['id']>()


    useEffect(() => {
        if (select) setSelected(select)
    }, [select]);


    function handleButtonClick(b: ButtonGroupType) {
        if (selected !== b.id) {
            setSelected(b.id)
            onClick?.(b)
        }
    }


    return (
        <div className={clsx('buttons-group', className)}>
            {buttons.map(b => (
                <Button
                    className={clsx('bg-btn', {selected: b.id === selected})}
                    onClick={() => handleButtonClick(b)}
                >{b.name}</Button>
            ))
            }
        </div>
    );
}
