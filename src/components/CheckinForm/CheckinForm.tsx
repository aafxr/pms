import React, {useMemo} from 'react';

import {useAppContext} from "../../contexts/AppContextProvider";
import {CollapseContainer} from "../CollapseContainer";
import {CounterInput} from "../Counterinput";
import {DateInput} from "../DateInput";
import {Select} from "../Select";
import {Input} from "../Input";

import './CheckinForm.scss'


export interface CheckinFormPropsType {

}


export function CheckinForm({}: CheckinFormPropsType) {
    const {appState} = useAppContext()
    const {board} = appState

    const roomsOptions = useMemo(() => {
        return Array
            .from(board?.rooms.values() || [])
            .map(r => ({id: r.id, value: '' + r.id}))
    }, [])



    return (
        <div className='checkin'>
            <div className='checkin-container'>
                <CollapseContainer>
                    <div className='checkin-block'>
                        <div className="checkin-options">
                            <div className="checkin-option">
                                <div className="checkin-title">Заезд</div>
                                <DateInput
                                    className="checkin-date"
                                    onChange={console.log}
                                    onSelect={console.log}
                                />
                                <div className="checkin-message"></div>
                            </div>

                            <div className="checkin-option">
                                <div className="checkin-title">Выезд</div>
                                <DateInput
                                    className="checkin-date"
                                    onChange={console.log}
                                    onSelect={console.log}
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

                    <div className='checkin-block'>
                        <div className="checkin-options">
                            <div className="checkin-option">
                                <div className="checkin-title">Номер</div>
                                <Select className='checkin-select' items={roomsOptions} maxSelectItems={5}/>
                                <div className="checkin-message"></div>
                            </div>

                            <div className="checkin-option">
                                <div className="checkin-title">Привязать гостя</div>
                                <Select className='checkin-input' items={[]}/>
                                <div className="checkin-message"></div>
                            </div>

                        </div>
                    </div>
                </CollapseContainer>
            </div>

        </div>
    );
}

