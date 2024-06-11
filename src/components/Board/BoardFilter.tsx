import React from 'react';
import {Button, ButtonsGroup} from "../buttons";
import {Row} from "../flex";


const groupButtons = [
    {id: 1, name: 'Сутки'},
    {id: 2, name: 'Час'}
]


function BoardFilter() {
    return (
        <div className='board-filter'>
            <ButtonsGroup select={1} buttons={groupButtons}/>
            <Row className='board-filter-info'>
                <Button className='board-filter-month'><span>Октябрь, 2024</span></Button>
                <Button className='board-filter-day'><span>Сегодня</span></Button>
            </Row>
        </div>
    );
}

export default BoardFilter;