import {Modal} from "../../components";

import {CheckinForm} from "../../components/CheckinForm";
import './Dev.scss'


export function Dev() {


    return (
        <Modal open={true}>
            <div className='dev'>

            <CheckinForm />
            </div>
        </Modal>
    )
}

