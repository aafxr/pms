import {Input, Modal, Select} from "../../components";
import DatePicker from "react-datepicker";
import './Dev.scss'


export function Dev() {


    return (
        <Modal open={true}>
            <div className='dev'>
                <div className="guestForm">
                    <div className='guestForm-container'>
                        <div className='guestForm-content'>
                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Гость 1</div>
                                        <Select className="guestForm-guestSelect" items={[]}/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Фамилия*</div>
                                        <Input className="guestForm-input"/>
                                        <div className="guestForm-message"></div>
                                    </div>

                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Имя*</div>
                                        <Input className="guestForm-input"/>
                                        <div className="guestForm-message"></div>
                                    </div>

                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Отчество</div>
                                        <Input className="guestForm-input"/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Телефон*</div>
                                        <Input type='tel' className="guestForm-input"/>
                                        <div className="guestForm-message"></div>
                                    </div>

                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Эл. почта</div>
                                        <Input type='email' className="guestForm-input"/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Тип документа</div>
                                        <Select className="guestForm-document" items={[]}/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Серия</div>
                                        <Input inputMode='numeric' className="guestForm-input guestForm-input-seria"/>
                                        <div className="guestForm-message"></div>
                                    </div>

                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Номер</div>
                                        <Input inputMode='numeric'
                                               className="guestForm-input guestForm-input-docNumber"/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Кем выдан</div>
                                        <Input className="guestForm-input guestForm-input-seria"/>
                                        <div className="guestForm-message"></div>
                                    </div>

                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Дата выдачи</div>
                                        <DatePicker className="guestForm-date"/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="guestForm-block">
                                <div className="guestForm-options">
                                    <div className="guestForm-option">
                                        <div className="guestForm-title">Вложения</div>
                                        <Input type='file' className="guestForm-input guestForm-input-file"/>
                                        <div className="guestForm-message"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

