import React, {useState} from 'react';
import {Row} from "../flex";
import {Button, ButtonGroupType, ButtonsGroup} from "../buttons";
import {PlusIcon} from "../svg";
import {Search} from "../Search";
import {Blank} from "../Blank";
import {CompanyCreateModal} from "../../modals";

import './CompanyList.scss'
import {SettingsFilterButtons, SettingsFilterButtonsVariant} from "../SettingsFilterButtons";

export function CompanyList() {
    const [showCreateCompanyModel, setShowCreateCompanyModel] = useState(false)
    const [filterButton, setFilterButton] = useState(SettingsFilterButtonsVariant.ACTIVE)


    function handleCreateCompanyClick(){
        setShowCreateCompanyModel(true)
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

            <CompanyCreateModal open={showCreateCompanyModel} onClose={() => setShowCreateCompanyModel(false)} />
        </div>
    );
}

