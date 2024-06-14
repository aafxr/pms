import React from 'react';

import {Property} from "../../core/classes/Property";

import './PropertyEdit.scss'
import {Accordion} from "../Accordion";


export interface PropertyEditPropsType {
    property: Property
}

export function PropertyEdit({}: PropertyEditPropsType) {
    return (
        <div className='property'>
            <Accordion title='Общая информация'>

            </Accordion>
        </div>
    );
}

