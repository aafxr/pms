import React, {useEffect, useRef} from 'react';

import {RadioButtonIcon} from "../svg";

import './Radio.scss'
import clsx from "clsx";

export type RadioOptionType = {
    value: string;
    title: string;
};

type RadioProps = {
    value: RadioOptionType["value"];
    title: RadioOptionType["title"];
    selected?: RadioOptionType["value"];
    groupName: string;
    onChange?: (value: RadioOptionType["value"]) => void;
};

export function Radio({groupName, selected, title, onChange, value}: RadioProps) {

    const optionRef = useRef<HTMLDivElement>(null);

    const handleChange = () => onChange?.(value);

    useEffect(() => {
        const option = optionRef.current;

        if (!option) return;

        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement === option && event.key === "Enter") {
                onChange?.(value);
            }
        };

        option.addEventListener("keydown", handleEnterKeyDown);

        return () => {
            option.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, [value, onChange]);

    const inputId = `${groupName}_radio_item_with_value__${value}`;
    const isChecked = value === selected;


     return (
        <div
            className={'radio-item'}
            key={value}
            data-selected={isChecked}
            data-testid={inputId}
            tabIndex={0}
            onClick={() => onChange?.(value)}
            ref={optionRef}
        >
            <RadioButtonIcon className='radio-icon icon-24' checked={isChecked} />
            <input
                className={'radio-input'}
                type="radio"
                name={groupName}
                id={inputId}
                value={value}
                onChange={handleChange}
                tabIndex={-1}
            />
            <label className={'radio-label'} htmlFor={inputId}>
                {title}
            </label>
        </div>
    );
}


type RadioGroupProps = {
    className?: string
    name: string;
    options: RadioOptionType[];
    selected?: RadioOptionType["value"];
    onChange?: (value: RadioOptionType["value"]) => void;
};

export const RadioGroup = (props: RadioGroupProps) => {
    const { className, name, options, selected, onChange } = props;

    const handleChange = (value: string) => onChange?.(value);

    return (
        <div className={clsx('radio-group', className)}>
            {options.map(({ value, title }) => (
                <Radio
                    key={value}
                    groupName={name}
                    value={value}
                    title={title}
                    selected={selected}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
};

