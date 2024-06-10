import React from 'react';
import {Button, ButtonsGroup} from "../../../buttons";
import {Column, Row} from "../../../flex";


export function BFilter() {
    return (
        <div className='b-filter'>
            <ButtonsGroup
                buttons={[
                    {id: 1, name: 'Час'},
                    {id: 2, name: 'Сутки'},
                ]}
                select={1}
            />
            <Row className='date-info'>
                <Button className='date '>
                    {new Date().toLocaleDateString(navigator.language, {month: "long", year: "numeric"})}
                </Button>
                <Button className='current-date'>Сегодня</Button>
            </Row>
        </div>
    );
}

