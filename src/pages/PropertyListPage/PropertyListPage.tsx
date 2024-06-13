import React from 'react';
import {Container, Header, SettingsMenu, Wrapper} from "../../components";

import './PropertyList.scss'

export function PropertyListPage() {
    return (
        <Wrapper className='property-list'>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <div className='property-list-grid'>
                        <div className='property-list-menu'>
                            <SettingsMenu initState={{company: true}}/>
                        </div>
                        <div className='property-list-content'></div>
                    </div>

                </Container>
            </Wrapper.Content>
        </Wrapper>
    );
}
