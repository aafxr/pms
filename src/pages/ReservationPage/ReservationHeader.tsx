import React from 'react';
import {Button} from "../../components";




export function ReservationHeader() {
    return (
        <div className='reservation-header'>
            <div className='reservation-title'>Бронирование</div>
            <div className='reservation-buttons'>
                <Button className='selected'>Создание брони</Button>
                <Button>Контактные данные</Button>
                <Button>Гости</Button>
                <Button>Заселение</Button>
                <Button>Доп. услуги</Button>
            </div>
        </div>
    );
}
