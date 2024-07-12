import React, {forwardRef, TextareaHTMLAttributes} from 'react';
import clsx from "clsx";

import './TextArea.scss'


export interface TextareaPropsType extends TextareaHTMLAttributes<HTMLTextAreaElement>{}


export const TextArea = forwardRef<HTMLTextAreaElement, TextareaPropsType>((props, ref ) => {
    return (
        <textarea ref={ref} {...props} className={clsx('textarea', props.className)} />
    );
})

