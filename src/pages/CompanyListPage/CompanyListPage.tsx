import React, {useState} from 'react';
import {Blank, Button, Container, Header, Search, SettingsMenu, Wrapper} from "../../components";
import {PropertiesList} from "../../components/PropertiesList";

import './CompanyListPage.scss'
import {Row} from "../../components/flex";
import {PlusIcon} from "../../components/svg";
import {CompanyCreateModal} from "../../modals";

export function CompanyListPage() {
    const [showCreateCompanyModel, setShowCreateCompanyModel] = useState(false)


    function handleCreateCompanyClick(){
        setShowCreateCompanyModel(true)
    }

    return (
        <Wrapper className='company-list'>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <div className='company-list-grid'>
                        <div className='company-list-menu'>
                            <SettingsMenu initState={{company: true}}/>
                        </div>
                        <div className='company-list-content'>
                            <Blank>
                                <Row full justify={'between'}>
                                    <h2 className='company-list-title'>Управление компаниями</h2>
                                    <Row justify='end'>
                                        <Button className='company-list-button' onClick={handleCreateCompanyClick}>
                                            Добавить компанию
                                            <span className='company-list-icon'>
                                                <PlusIcon className='icon-24'/>
                                            </span>
                                        </Button>
                                        <Search className='company-list-search' placeholder='Компания'/>
                                    </Row>
                                </Row>
                            </Blank>
                            <PropertiesList/>
                        </div>
                    </div>
                    <CompanyCreateModal open={showCreateCompanyModel} onClose={() => setShowCreateCompanyModel(false)} />

                </Container>
            </Wrapper.Content>
        </Wrapper>
    );
}
