import clsx from "clsx";

import './Logo.css'

export interface LogoPropsType{
    className?: string
    onClick?: () => unknown
}

export function Logo({onClick,className}: LogoPropsType){
    return (
        <div
            className={clsx('logo', className)}
            onClick={onClick}
        >
            logo
        </div>
    )
}