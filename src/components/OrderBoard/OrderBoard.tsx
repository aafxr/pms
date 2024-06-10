import React from 'react';

import BHeader from "./BHeader/BHeader";

import './OrderBoard.css'
import clsx from "clsx";


export type OrderBoardStateType = {

}


export interface OrderBoardPropsType{
    className?: string
}


export function OrderBoard({className}: OrderBoardPropsType) {
    return (
        <div className={clsx('order-board', className)}>
            <BHeader />
        </div>
    );
}
