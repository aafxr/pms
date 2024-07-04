import React, {useEffect, useRef} from 'react';

import './Radio.scss'

type RadioType = {
    value: string;
    title: string;
};

type RadioProps = {
    value: RadioType["value"];
    title: RadioType["title"];
    selected: RadioType["value"];
    groupName: string;
    onChange?: (value: string) => void;
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
            data-checked={isChecked}
            data-testid={inputId}
            tabIndex={0}
            ref={optionRef}
        >
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
    name: string;
    options: RadioType[];
    selected: RadioType["value"];
    onChange?: (value: string) => void;
};

export const RadioGroup = (props: RadioGroupProps) => {
    const { name, options, selected, onChange } = props;

    const handleChange = (value: string) => onChange?.(value);

    return (
        <div className={'radio-group'}>
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

