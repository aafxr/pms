import React, {useState} from 'react';
import {Container, Header,  SettingsMenu, SettingsMenuStateType, Wrapper} from "../../components";
import {PropertiesList} from "../../components/PropertiesList";

import {CompanyList} from "../../components/CompanyList";

import './SettingsPage.scss'

export function SettingsPage() {
    const [menuState, setMenuState] = useState<SettingsMenuStateType>({
        company: true,
        category: false,
        extraProperty: false,
        workers: false,
        property: false,
        extraServices: false,
        mainProperty: false,
    })



    return (
        <Wrapper className='settings'>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                <Container className='settings-container'>
                    <div className='settings-grid'>
                        <div className='settings-menu'>
                            <SettingsMenu initState={{company: true}} onStateChange={setMenuState}/>
                        </div>
                        <div className='settings-content'>
                            {menuState.company && <CompanyList/>}
                            {menuState.property && <PropertiesList/>}
                        </div>
                    </div>

                </Container>
            </Wrapper.Content>
        </Wrapper>
    );
}
