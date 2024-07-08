import clsx from "clsx";
import React, {ChangeEvent, useMemo, useRef, useState} from 'react';

import {useAppContext} from "../../contexts/AppContextProvider";
import {BookingItem} from "../../core/classes/v1/BookingItem";
import {Property} from "../../core/classes/v1/Property";
import {Select, SelectOptionType} from "../Select";
import {Board} from "../../core/classes/v1/Board";
import {Filter, FilterProp} from "../../core/classes/Filter";
import {ChevronIcon} from "../svg";
import {Button} from "../buttons";

import './Reservations.scss'


export type ReservationsPropsType = {
    board: Board
    property: Property
    onBookingItemClick?: (b: BookingItem) => unknown
}


const sortVar: SelectOptionType[] = [
    {id: 1, value: 'по дате создания'}
]


export function Reservations({board, property, onBookingItemClick}: ReservationsPropsType) {
    const [filterOpen, setFilterOpen] = useState(false)
    const {appState: {bookingStatusFilter}} = useAppContext()
    const [sort, setSort] = useState<SelectOptionType>()
    const [filter, setFilter] =useState(new Filter<BookingItem>())
    const filtersRef = useRef<HTMLDivElement>(null)

    const bookingItems = useMemo(() => {
        const bl = Array.from(board.bookingItems.values())
            .filter(b =>
                b.room?.property?.id === property.id
                && bookingStatusFilter ? b.status === bookingStatusFilter : true
            )
        return filter.any(bl)
    }, [board, property, bookingStatusFilter, sort, filter])


    function handlePropertiesFilterChange(e: ChangeEvent<HTMLInputElement>){
        const val = e.target.checked
        if(val) {
            filter.removeFilter(1)
            const f = new Filter({filter})
            const fp = new FilterProp<BookingItem>(1,'Основные объекты', (b) => b.object_type =='room')
            f.addFilter(fp)
            setFilter(f)
        } else{
            filter.removeFilter(1)
            setFilter(new Filter({filter}))
        }
    }


    function handleExtraPropertiesFilterChange(e: ChangeEvent<HTMLInputElement>){
        const val = e.target.checked
        if(val) {
            filter.removeFilter(2)
            const f = new Filter({filter})
            const fp = new FilterProp<BookingItem>(2,'Доп. объекты', (b) => b.object_type !=='room')
            f.addFilter(fp)
            setFilter(f)
        } else{
            filter.removeFilter(2)
            setFilter(new Filter({filter}))
        }
    }


    function handleDailyFilterChange(e: ChangeEvent<HTMLInputElement>){
        const val = e.target.checked
        if(val) {
            filter.removeFilter(3)
            const f = new Filter({filter})
            const fp = new FilterProp<BookingItem>(3,'Сутки', (b) => b.type !=='daily')
            f.addFilter(fp)
            setFilter(f)
        } else{
            filter.removeFilter(3)
            setFilter(new Filter({filter}))
        }
    }


    function handleHourlyFilterChange(e: ChangeEvent<HTMLInputElement>){
        const val = e.target.checked
        if(val) {
            filter.removeFilter(4)
            const f = new Filter({filter})
            const fp = new FilterProp<BookingItem>(4,'Час', (b) => b.type !=='hourly')
            f.addFilter(fp)
            setFilter(f)
        } else{
            filter.removeFilter(4)
            setFilter(new Filter({filter}))
        }
    }


    function handleFilterButtonClick(){
        const el = filtersRef.current
        if(!el) return

        if(filterOpen){
            el.style.maxHeight = '0'
        } else{
            el.style.maxHeight = el.scrollHeight + 'px'
        }
        setFilterOpen(!filterOpen)
    }


    return (
        <div className='reservation'>

            <div className='reservation-container'>

                <div className='reservation-filters-container'>
                    <Button
                        variant={"bgTransparent"}
                        className={clsx('reservation-filter-button', {open: filterOpen})}
                        onClick={handleFilterButtonClick}
                    >
                        <ChevronIcon className='reservation-filter-icon icon-16'/>
                        Фильтр
                    </Button>

                    <div ref={filtersRef} className='reservation-filters'>

                        <div className='reservation-filter'>
                            <div className='reservation-filter-header'>
                                <ChevronIcon className='reservation-filter-icon icon-16'/>
                                <div className='reservation-filter-title'>Объекты</div>
                            </div>

                            <div className='reservation-filter-content'>
                                <label className='reserfation-filter-label' htmlFor="properties">
                                    <input type="checkbox" id='properties' onChange={handlePropertiesFilterChange}/>
                                    Основные объекты
                                </label>
                                <label className='reserfation-filter-label' htmlFor={'extra-properties'}>
                                    <input type="checkbox" id='extra-properties'
                                           onChange={handleExtraPropertiesFilterChange}/>
                                    Доп. объекты
                                </label>
                            </div>
                        </div>

                        <div className='reservation-filter'>
                            <div className='reservation-filter-header'>
                                <ChevronIcon className='reservation-filter-icon icon-16'/>
                                <div className='reservation-filter-title'>Время</div>
                            </div>

                            <div className='reservation-filter-content'>
                                <label className='reserfation-filter-label' htmlFor={'daily'}>
                                    <input type="checkbox" id='daily' onChange={handleDailyFilterChange}/>
                                    Час
                                </label>
                                <label className='reserfation-filter-label' htmlFor="hourly">
                                    <input type="checkbox" id='hourly' onChange={handleHourlyFilterChange}/>
                                    Сутки
                                </label>
                            </div>
                        </div>

                    </div>
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

        </div>
    )
        ;
}
