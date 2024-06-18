import React, {useState} from 'react';

import {Row} from "../flex";
import {Button} from "../buttons";

import {Property} from "../../core/classes/Property";
import './PropertiesList.scss'
import {SettingsFilterButtons, SettingsFilterButtonsVariant} from "../SettingsFilterButtons";
import {Blank} from "../Blank";
import {PlusIcon} from "../svg";
import {Search} from "../Search";


const mockData = [
    new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(),new Property(),
    new Property(), new Property(),
    new Property(),
]


export interface PropertiesListPropsType{
    onPropertyClick?: (p : Property) => unknown
}


export function PropertiesList() {
    const [properties, setCompanies] = React.useState<Property[]>(mockData);
    const [filterButton, setFilterButton] = useState(SettingsFilterButtonsVariant.ACTIVE)


    return (
        <div className="properties">
            <Blank>
                <Row full justify={'between'}>
                    <h2 className='companyList-title'>Управление объектами размещения</h2>
                    <Row justify='end'>
                        <Button className='companyList-button' >
                            Добавить объект аренды
                            <span className='companyList-icon'>
                                <PlusIcon className='icon-24'/>
                            </span>
                        </Button>
                        <Search className='companyList-search' placeholder='объект размещения'/>
                    </Row>
                </Row>
            </Blank>

            <SettingsFilterButtons value={filterButton} onChange={setFilterButton} />



            <table className='properties-table'>
                <thead>
                <tr>
                    <th>Дата создания</th>
                    <th>Логотип</th>
                    <th>Название компании</th>
                    <th>Страна</th>
                    <th>Юридический адрес</th>
                    <th>Руководитель</th>
                    <th>Телефон</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {properties.map(p => (
                    <tr key={p.name}>
                        <td>
                            {p.company.created_at.toLocaleDateString(navigator.languages, {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })}
                        </td>
                        <td>{p.company.logo}</td>
                        <td>{p.name}</td>
                        <td>{p.country}</td>
                        <td>{p.address}</td>
                        <td>{p.company.name}</td>
                        <td>{p.company.INN}</td>
                        <td>
                            <Button>Смотреть</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
        ;
}
