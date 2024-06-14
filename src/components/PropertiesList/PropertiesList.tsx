import React from 'react';

import {Row} from "../flex";
import {Button} from "../buttons";

import {Property} from "../../core/classes/Property";
import './PropertiesList.scss'


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

    return (
        <div className="properties">


            <Row className='properties-buttons' full justify='start'>
                <Button className='properties-button selected'>
                    Действующие
                </Button>
                <Button className='properties-button'>
                    Архив
                </Button>
                <Button className='properties-button'>
                    Журнал изменений
                </Button>

            </Row>

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
