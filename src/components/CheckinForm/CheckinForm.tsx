import React from 'react';

import './CheckinForm.scss'
import {DatePickerCustom} from "../DatePickerCustom";
import {Input} from "../Input";
import {CollapseContainer} from "../CollapseContainer";
import {CounterInput} from "../Counterinput";


export interface CheckinFormPropsType {

}


export function CheckinForm({}: CheckinFormPropsType) {
    return (
        <div className='checkin'>

            <CollapseContainer>
                <div className='checkin-block'>
                    <div className="checkin-options">
                        <div className="checkin-option">
                            <div className="checkin-title">Заезд</div>
                            <DatePickerCustom
                                className="checkin-date"
                                onChange={console.log}
                                onSelect={console.log}
                                excludeScrollbar={{}}
                            />
                            <div className="checkin-message"></div>
                        </div>

                        <div className="checkin-option">
                            <div className="checkin-title">Выезд</div>
                            <DatePickerCustom
                                className="checkin-date"
                                onChange={console.log}
                                onSelect={console.log}
                                excludeScrollbar={{}}
                            />
                            <div className="checkin-message"></div>
                        </div>
                    </div>
                </div>

                <div className='checkin-block'>
                    <div className="checkin-options">
                        <div className="checkin-option">
                            <div className="checkin-title">Категория</div>
                            <Input className='checkin-input'/>
                            <div className="checkin-message"></div>
                        </div>

                        <div className="checkin-option">
                            <div className="checkin-title">Тариф</div>
                            <Input className='checkin-input'/>
                            <div className="checkin-message"></div>
                        </div>

                        <div className="checkin-option">
                            <div className="checkin-title">Размещение</div>
                            <CounterInput className='checkin-input'/>
                            <div className="checkin-message"></div>
                        </div>
                    </div>
                </div>
            </CollapseContainer>
        </div>
    );
}

