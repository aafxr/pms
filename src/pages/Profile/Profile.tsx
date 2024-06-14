import React from 'react';
import {Blank, Container, Header, UserInfoCard, Wrapper} from "../../components";

import './Profile.scss'
import {User} from "../../core/classes/employee/User";
import {EmployeeRole} from "../../core/classes/employee/Employee";


const user = new User({
    jobTitle: 'manager',
    email: 'user@gmail.com',
    firstName: 'ivan',
    secondName: 'ivanovich',
    lastName: 'ivanov',
    phoneNumber: '89998887766',
    photo: '',
    role: EmployeeRole.ADMINISTRATOR,
})


export function Profile() {
    return (
        <Wrapper className='profile'>
            <Wrapper.Header>
                <Header />
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <Blank className='profile-title'>
                        <h2 className='title'>Личный кабинет</h2>
                    </Blank>

                    <section className='profile-content'>
                        <UserInfoCard user={user} />
                    </section>
                </Container>
            </Wrapper.Content>
        </Wrapper>
    );
}

