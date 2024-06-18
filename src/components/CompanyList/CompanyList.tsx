import React, {useState} from 'react';
import {Row} from "../flex";

import {SettingsFilterButtons, SettingsFilterButtonsVariant} from "../SettingsFilterButtons";
import {Button, ButtonGroupType, ButtonsGroup} from "../buttons";
import {CompanyCreateModal} from "../../modals";
import {PlusIcon} from "../svg";
import {Search} from "../Search";
import {Blank} from "../Blank";

import './CompanyList.scss'
import {UR_Company} from "../../core/classes/Company";

export function CompanyList() {
    const [showCreateCompanyModel, setShowCreateCompanyModel] = useState(false)
    const [filterButton, setFilterButton] = useState(SettingsFilterButtonsVariant.ACTIVE)
    const [companies, setCompanies] = useState([
        new UR_Company(),
        new UR_Company(),
        new UR_Company(),
    ])


    function handleCreateCompanyClick(){
        setShowCreateCompanyModel(true)
    }

    function handleDetailButtonClick(c: UR_Company){
        console.log(c)
    }


    return (
        <div className='companyList'>
            <Blank>
                <Row full justify={'between'}>
                    <h2 className='companyList-title'>Управление компаниями</h2>
                    <Row justify='end'>
                        <Button className='companyList-button' onClick={handleCreateCompanyClick}>
                            Добавить компанию
                            <span className='companyList-icon'>
                                <PlusIcon className='icon-24'/>
                            </span>
                        </Button>
                        <Search className='companyList-search' placeholder='Компания'/>
                    </Row>
                </Row>
            </Blank>

            <SettingsFilterButtons value={filterButton} onChange={setFilterButton} />

            <div className='companyList-companies'>
                <div className='companyList-header'>Дата создания</div>
                <div className='companyList-header'>Логотип</div>
                <div className='companyList-header'>Название компании</div>
                <div className='companyList-header'>Страна</div>
                <div className='companyList-header'>Юридический адрес</div>
                <div className='companyList-header'>Руководитель</div>
                <div className='companyList-header'>Телефон</div>
                <div className='companyList-header'></div>

                {companies.map(c => (
                    <>
                        <div className='companyList-item companyList-item-first'>
                            {c.created_at.toLocaleDateString(navigator.language, {day:"2-digit", month: "2-digit", year: "numeric"})}
                        </div>
                        <div className='companyList-item'>{c.logo}</div>
                        <div className='companyList-item'>{c.name}</div>
                        <div className='companyList-item'>{c.city}</div>
                        <div className='companyList-item'>{c.ur_address}</div>
                        <div className='companyList-item'>{c.director}</div>
                        <div className='companyList-item'>{c.directorPhone}</div>
                        <div className='companyList-item companyList-item-last'>
                            <Button variant={'bgTransparent'} onClick={() => handleDetailButtonClick(c)}>Подробно</Button>
                        </div>
                    </>
                ))}
            </div>

            <CompanyCreateModal open={showCreateCompanyModel} onClose={() => setShowCreateCompanyModel(false)}/>
        </div>
    );
}

