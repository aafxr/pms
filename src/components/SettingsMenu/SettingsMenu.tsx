import React, {useEffect, useRef, useState} from 'react';

import './SettingsMenu.scss'
import {
    BriefcaseIcon,
    CategoryIcon,
    CompanyIcon,
    FiguresIcon,
    GazeboIcon,
    KeyIcon,
    MenuArrowIcon,
    StructurIcon
} from "../svg";
import {useOutside} from "../../hooks";
import clsx from "clsx";


export interface SettingsMenu {
    initState?: Partial<SettingsMenuStateType>
    onStateChange?: (state: SettingsMenuStateType) => void
    open?: boolean
    onOpenChanged?: (value: boolean) => void
    className?: string
}


const defaultSettingsMenuType = {
    company: false,
    property: false,
    mainProperty: false,
    extraProperty: false,
    extraServices: false,
    category: false,
    workers: false
}

export type SettingsMenuStateType = typeof defaultSettingsMenuType


export function SettingsMenu({className, open, onOpenChanged, initState, onStateChange}: SettingsMenu) {
    const [state, setState] = useState<SettingsMenuStateType>(defaultSettingsMenuType)
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useOutside(contentRef, () => {
        setIsOpen(false)
        onOpenChanged?.(false)
    })


    useEffect(() => {
        if (initState) setState({...defaultSettingsMenuType, ...initState})
    }, []);


    useEffect(() => {
        if (open !== undefined && open !== isOpen) setIsOpen(open)
    }, []);


    function handleOpenChange() {
        const value = !isOpen
        setIsOpen(value)
        onOpenChanged?.(value)
    }


    function toggleMenuState(key: keyof SettingsMenuStateType) {
        const newState = {...defaultSettingsMenuType, [key]: true}
        setState(newState)
        onStateChange?.(newState)
    }


    return (
        <div className={clsx('smenu', {open: isOpen}, className)}>
            <div ref={contentRef} className='smenu-content'>

                <ul className='smenu-items'>
                    <li className='smenu-item smenu-item-menu-btn'>
                        <div className='smenu-icon' onClick={handleOpenChange}>
                            <MenuArrowIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'></div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.company})}
                        onClick={() => toggleMenuState('company')}>
                        <div className='smenu-icon'>
                            <BriefcaseIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Компании</div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.property})}
                        onClick={() => toggleMenuState('property')}>
                        <div className='smenu-icon'>
                            <CompanyIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Объекты размещения</div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.mainProperty})}
                        onClick={() => toggleMenuState('mainProperty')}>
                        <div className='smenu-icon'>
                            <KeyIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Основные объекты аренды</div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.extraProperty})}
                        onClick={() => toggleMenuState('extraProperty')}>
                        <div className='smenu-icon'>
                            <GazeboIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Дополнительные объекты аренды</div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.extraServices})}
                        onClick={() => toggleMenuState('extraServices')}>
                        <div className='smenu-icon'>
                            <FiguresIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Дополнительные услуги</div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.category})}
                        onClick={() => toggleMenuState('category')}>
                        <div className='smenu-icon'>
                            <CategoryIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Категории</div>
                    </li>

                    <li className={clsx('smenu-item', {selected: state.workers})}
                        onClick={() => toggleMenuState('workers')}>
                        <div className='smenu-icon'>
                            <StructurIcon className='icon-20'/>
                        </div>
                        <div className='smenu-text'>Сотрудники</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
