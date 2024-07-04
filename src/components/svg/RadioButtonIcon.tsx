import React, {HTMLAttributes} from 'react';


export interface CheckboxIconPropsType extends HTMLAttributes<SVGSVGElement> {
    checked?: boolean
}


export function RadioButtonIcon({checked, ...props}: CheckboxIconPropsType) {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11.5" stroke="currentColor"/>
            {checked && <circle cx="12" cy="12" r="6" fill="currentColor"/>}
        </svg>
    );
}
