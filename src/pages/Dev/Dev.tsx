import {FileInput} from "../../components/FileInput";
import {Modal} from "../../components";

import './Dev.scss'
import {GuestForm} from "../../components/GuestForm";


export function Dev() {


    return (
        <Modal open={true}>
            <div className='dev'>

            <GuestForm />
            </div>
        </Modal>
    )
}

