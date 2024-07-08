import React, {useRef} from 'react';
import clsx from "clsx";

import './FileInput.scss'
import {PaperclipIcon} from "../svg";


export interface FileInputPropsType {
    className?: string
    accept?: string
    multiple?: boolean
    onChange?: (file: File[]) => unknown
    placeholder?: string
    text?: string
    disabled?: boolean
}

export function FileInput({className, accept, multiple, onChange, text, placeholder, disabled}: FileInputPropsType) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let fileList = e.target.files
        if (fileList) {
            const files = Array.from(fileList)
            if (multiple && files.length) {
                onChange?.(files)
                return
            }

            const file = files[0]
            if (file) {
                onChange?.([file])
                return
            }
        }
    }


    function handleClick(){
        fileInputRef.current?.click()
    }


    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>){
        const {keyCode} = e
        if(keyCode === 32 || keyCode == 13){
            handleClick()
        }
    }


    return (
        <div
            className={clsx('fileInput',{'fileInput-disabled': disabled}, className)}
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {text
                ? <span className='fileInput-text'>{text}</span>
                : <span className='fileInput-placeholder'>{placeholder || ''}</span>
            }
            <PaperclipIcon className='fileInput-icon icon-24'/>

            <input
                ref={fileInputRef}
                className='fileInput-input'
                type="file"
                accept={accept}
                onChange={handleChange}
                multiple={multiple}
                tabIndex={-1}
            />
        </div>
    );
}

