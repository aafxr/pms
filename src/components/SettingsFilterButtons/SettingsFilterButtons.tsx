import React, {useEffect, useState} from 'react';
import {Button} from "../buttons";
import {Row} from "../flex";

import './SettingsFilterButtons.scss'


export enum SettingsFilterButtonsVariant {
    ACTIVE,
    ARCHIVE,
    MAGAZINE
}


export const SETTINGS_FILTER_BUTTON = 'settingsFilterButton'


export interface SettingsFilterButtonsPropsType {
    value?: SettingsFilterButtonsVariant
    onChange?: (variant: SettingsFilterButtonsVariant) => unknown
}


export function SettingsFilterButtons({
                                   value,
                                   onChange
                               }: SettingsFilterButtonsPropsType) {
    const [selected, setSelected] = useState(() => +localStorage[SETTINGS_FILTER_BUTTON] as SettingsFilterButtonsVariant)


    useEffect(() => {
        if(!value && localStorage[SETTINGS_FILTER_BUTTON] !== undefined) {
            const v = +localStorage[SETTINGS_FILTER_BUTTON] as SettingsFilterButtonsVariant
            setSelected(v)
            onChange?.(v)
        }
    }, []);


    useEffect(() => {
        if (value !== undefined && value !== selected) {
            setSelected(value)
        }
    }, [value]);


    function handleButtonClick(v: SettingsFilterButtonsVariant) {
        if (v === selected) return
        setSelected(v)
        onChange?.(v)
        localStorage.setItem(SETTINGS_FILTER_BUTTON, v.toString())
    }


    return (
        <Row className='filter-buttons'>
            <Button
                variant={selected === SettingsFilterButtonsVariant.ACTIVE ? 'active': "regular"}
                onClick={() => handleButtonClick(SettingsFilterButtonsVariant.ACTIVE)}
            >Действующие</Button>
            <Button
                variant={selected === SettingsFilterButtonsVariant.ARCHIVE ? 'active': "regular"}
                onClick={() => handleButtonClick(SettingsFilterButtonsVariant.ARCHIVE)}
            >Архив</Button>
            <Button
                variant={selected === SettingsFilterButtonsVariant.MAGAZINE ? 'active': "regular"}
                onClick={() => handleButtonClick(SettingsFilterButtonsVariant.MAGAZINE)}
            >Журнал изменений</Button>
        </Row>
    );
}

