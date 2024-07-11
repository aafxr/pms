import {Input, Modal} from "../../components";

import './Dev.scss'


export function Dev() {


    return (
        <Modal open={true}>
            <div className='dev'>
                <Input data-currency={'RUB'} />

            </div>
        </Modal>
    )
}

