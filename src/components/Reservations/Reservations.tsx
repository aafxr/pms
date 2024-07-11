import clsx from "clsx";
import React, {useEffect, useMemo, useRef, useState} from 'react';

import {useAppContext} from "../../contexts/AppContextProvider";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Filter} from "../../core/classes/orders-filter";
import {Property} from "../../core/classes/v1/Property";
import {TimeStrategyFilter} from "./TimeStrategyFilter";
import {ObjectTypeFilter} from "./ObjectTypeFilter";
import {Select, SelectOptionType} from "../Select";
import {Board} from "../../core/classes/v1/Board";
import {ChevronIcon} from "../svg";
import {Button} from "../buttons";

import './Reservations.scss'
import {FilterByDateRange} from "./FilterByDateRange";


export type ReservationsPropsType = {
    board: Board
    property: Property
    onBookingItemClick?: (b: BookingItem) => unknown
}


const sortVar: SelectOptionType[] = [
    {id: 1, value: 'по дате создания'}
]


export function Reservations({board, property, onBookingItemClick}: ReservationsPropsType) {
    const [filterOpen, setFilterOpen] = useState(true)
    const {appState: {bookingStatusFilter}} = useAppContext()
    const [sort, setSort] = useState<SelectOptionType>()
    const [filter, setFilter] = useState(new Filter<BookingItem>())
    const filtersRef = useRef<HTMLDivElement>(null)

    const bookingItems = useMemo(() => {
        const bl = Array.from(board.bookingItems.values())
            .filter(b =>
                b.room?.property?.id === property.id
                && bookingStatusFilter ? b.status === bookingStatusFilter : true
            )
        return filter.any(bl)
    }, [board, property, bookingStatusFilter, sort, filter])


    useEffect(() => {
        calcFilterOpen(filterOpen)
    }, []);


    const calcFilterOpen = (val: boolean) => {
        const el = filtersRef.current
        if (!el) return

        if (val) {
            el.style.maxHeight = el.scrollHeight + 'px'
        } else {
            el.style.maxHeight = '0'
        }
    }


    function handleFilterButtonClick() {
        calcFilterOpen(!filterOpen)
        setFilterOpen(!filterOpen)
    }


    function handleFilterChange(f: Filter<BookingItem>){
        setFilter(new Filter({filter:f}))
    }


    return (
        <div className='reservation'>

            <div className='reservation-container'>

                <div
                    className='reservation-filters-container'
                    onClick={() => calcFilterOpen(filterOpen)}
                >
                    <Button
                        variant={"bgTransparent"}
                        className={clsx('reservation-filter-button', {open: filterOpen})}
                        onClick={handleFilterButtonClick}
                    >
                        <ChevronIcon className='reservation-filter-icon icon-16'/>
                        Фильтр
                    </Button>

                    {filterOpen && <div ref={filtersRef} className='reservation-filters'>

                        <ObjectTypeFilter filter={filter} onChange={handleFilterChange}/>

                        <TimeStrategyFilter filter={filter} onChange={handleFilterChange}/>

                        {/*<FilterByDateRange filter={filter} onChange={handleFilterChange}/>*/}

                    </div>}
                </div>


                <div className='reservation-sort'>
                    Сортировка по:&nbsp;
                    <Select
                        className='reservation-select'
                        placeholder={'title'}
                        value={sortVar[0]} items={sortVar}
                        onSelect={setSort}
                    />
                </div>


                <div className='reservation-list'>
                    <div className='orders'>

                        <div className='orders-header'>
                            <div className='orders-header-item orders-header-property'
                                 title={'Объект размещения'}>Объект размещения
                            </div>
                            <div className='orders-header-item orders-header-property-type' title={'Объект'}>Объект
                            </div>
                            <div className='orders-header-item orders-header-time-type' title={'Время'}>Время</div>
                            <div className='orders-header-item orders-header-customer'
                                 title={'Заказчик/Тел.'}>Заказчик/Тел.
                            </div>
                            <div className='orders-header-item orders-header-range' title={'Период'}>Период</div>
                            <div className='orders-header-item orders-header-tarif' title={'Тариф'}>Тариф</div>
                            <div className='orders-header-item orders-header-room' title={'Номер'}>Номер</div>
                            <div className='orders-header-item orders-header-guests' title={'Гости'}>Гости</div>
                            <div className='orders-header-item orders-header-deal' title={'Сделка'}>Сделка</div>
                            <div className='orders-header-item orders-header-balance' title={'Баланс'}>Баланс</div>
                            <div className='orders-header-item orders-header-total' title={'Сумма брони'}>Сумма брони
                            </div>
                        </div>

                        {bookingItems.map(b => (
                            <div key={b.id} className='orders-order order' onClick={() => onBookingItemClick?.(b)}>
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
                                <div className='order-prop order-prop-tarif'>{b.tariff}</div>
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

        </div>
    )
        ;
}
