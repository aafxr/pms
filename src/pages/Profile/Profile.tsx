import React, {useState} from 'react';
import {Blank, Container, EditUser, Header, Modal, UserInfoCard, Wrapper} from "../../components";
import {Accordion} from "../../components/Accordion";
import {useUser} from "../../hooks/useUser";

import './Profile.scss'


export function Profile() {
    const {user} = useUser()
    const [isEditModal, setIsEditeModal] = useState(false);


    return (
        <Wrapper className='profile'>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <Blank className='profile-title'>
                        <h2 className='title'>Личный кабинет</h2>
                    </Blank>

                    <section className='profile-content'>
                        {user && <UserInfoCard user={user} onEdit={() => setIsEditeModal(true)} />}

                        <section className='profile-spaces'>
                            <Accordion className='profile-space profile-space-user' title={'Мои рабочие пространства'}>

                            </Accordion>
                            <Accordion className='profile-space profile-space-availabler'
                                       title={'Доступные рабочие пространства'}>

                            </Accordion>
                        </section>
                    </section>
                    {isEditModal && !!user && (
                        <Modal open={isEditModal} onClose={() => setIsEditeModal(false)}>
                            <EditUser user={user}
                                      onCancel={() => setIsEditeModal(false)}
                                      onSave={() => {
                                      }}
                            />
                        </Modal>
                    )}
                </Container>
            </Wrapper.Content>
        </Wrapper>
    );
}

