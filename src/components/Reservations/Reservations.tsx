import React from 'react';

import {Select2, SelectOptionType} from "../Select2/Select2";
import {Board} from "../../core/classes/v1/Board";

import './Reservations.scss'


export type ReservationsPropsType = {
    board: Board
}


export function Reservations({board}: ReservationsPropsType) {

    const bookingItems = Array.from(board.bookingItems.values())
    console.log(bookingItems)

    const sortVar: SelectOptionType[] = [
        {id: 1, value: 'по дате создания'}
    ]




    return (
        <div className='reservation'>

            <div className='reservation-container'>
                <div className='reservation-filter'>
                    filter
                </div>



                <div className='reservation-sort'>
                    Сортировка по:
                    <Select2 items={sortVar} title={'title'} />
                </div>


                <div className='reservation-list oreders'>
                    <div className='orders-header'>
                        <div className='orders-header-item orders-header-property'>Объект размещения</div>
                        <div className='orders-header-item orders-header-property-type'>Объект</div>
                        <div className='orders-header-item orders-header-time-type'>Время</div>
                        <div className='orders-header-item orders-header-customer'>Заказчик/Тел.</div>
                        <div className='orders-header-item orders-header-range'>Период</div>
                        <div className='orders-header-item orders-header-tarif'>Тариф</div>
                        <div className='orders-header-item orders-header-room'>Номер</div>
                        <div className='orders-header-item orders-header-guests'>Гости</div>
                        <div className='orders-header-item orders-header-deal'>Сделка</div>
                        <div className='orders-header-item orders-header-balance'>Баланс</div>
                        <div className='orders-header-item orders-header-total'>Сумма брони</div>
                    </div>

                    {bookingItems.map(b => (
                        <div key={b.id} className='orders-order order'>
                            <div className='order-prop order-prop-property'>{b.property?.name}</div>
                            <div className='order-prop order-prop-property-type'>{b.object_type}</div>
                            <div className='order-prop order-prop-time-type'>{b.type}</div>
                            <div className='order-prop order-prop-customer'>
                                <span>{b.booking?.customer?.fullName}</span>
                                <span className='order-extra-info'>{b.booking?.customer?.phone}</span>
                            </div>
                            <div className='order-prop order-prop-range'>
                                <span>{b.textDateRange}</span>
                            </div>
                            <div className='order-prop order-prop-tarif'>{b.tariff_id}</div>
                            <div className='order-prop order-prop-room'>
                                {b.room ? `${b.room?.id} / ${b.room?.name}` : '-'}
                            </div>
                            <div className='order-prop order-prop-guests'>{b.adults_count}</div>
                            <div className='order-prop order-prop-deal'>{b.booking_id}</div>
                            <div className='order-prop order-prop-balance'>Баланс</div>
                            <div className='order-prop order-prop-total'>{b.price}</div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}
