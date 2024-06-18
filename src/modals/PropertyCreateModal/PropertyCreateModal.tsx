import React, {useState} from 'react';

import {Modal, ModalPropsType} from "../../components";

import './PropertyCreateModal.scss'
import clsx from "clsx";


export interface PropertyCreatePropsType extends ModalPropsType{

}


function PropertyCreateModal({className, open, onClose}: PropertyCreatePropsType) {
    const [] = useState()


    return (
        <Modal open={open} onClose={onClose} className={className}>
            <div className='propertyCreate'>

            </div>
        </Modal>
    );
}

export default PropertyCreateModal;