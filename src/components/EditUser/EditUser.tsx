import React, {useEffect, useState} from 'react';
import {User} from "../../core/classes/employee/User";

import {EmployeeRole} from "../../core/classes/employee/Employee";
import {Select} from "../Selector";
import {Button} from "../buttons";
import {Input} from "../Input";
import './EditUser.scss'


export interface EditUserPropsType {
    user:User
    onCancel?:() => void
    onSave?:(user:User) => void
}

export function EditUser({user,onSave, onCancel}:EditUserPropsType) {
    const [editedUser, setEditedUser] = useState<User>();


    useEffect(() => {
        setEditedUser(new User(user))
    }, []);


    function handleSaveUser(){
        if(!editedUser) return
        onSave?.(editedUser)
    }


    return (
        <div className='editeUser'>
            <div className='editeUser-inner'>
                <h2 className='editeUser-title title'>Редактирование данных</h2>

                <div className='editeUser-photo'>
                    <img src={editedUser?.photo} alt={`${editedUser?.firstName} ${editedUser?.secondName} ${editedUser?.lastName}`}/>
                </div>

                <div className='editeUser-content'>
                    <div className='editeUser-property'>
                        <div className='editeUser-label label'>Фамилия</div>
                        <Input className={'editeUser-input'} placeholder='Фамилия' value={editedUser?.lastName}/>
                    </div>

                    <div className='editeUser-property'>
                        <div className='editeUser-label label'>Имя</div>
                        <Input className={'editeUser-input'} placeholder='Имя' value={editedUser?.firstName}/>
                    </div>

                    <div className='editeUser-property'>
                        <div className='editeUser-label label'>Отчество</div>
                        <Input className={'editeUser-input'} placeholder='Отчество' value={editedUser?.secondName}/>
                    </div>

                    <div className='editeUser-property editeUser-property-2'>
                        <div className='editeUser-label label'>Телефон</div>
                        <Input className={'editeUser-input'} type={'tel'} placeholder='Телефон' value={editedUser?.phoneNumber}/>
                    </div>

                    <div className='editeUser-property editeUser-property-2'>
                        <div className='editeUser-label label'>Эл. почта</div>
                        <Input className={'editeUser-input'} type={'email'} placeholder='Эл. почта' value={editedUser?.email}/>
                    </div>

                    <div className='editeUser-property editeUser-property-2'>
                        <div className='editeUser-label label'>Должность</div>
                        <Input className={'editeUser-input'} type={'text'} placeholder='Должность' value={editedUser?.jobTitle}/>
                    </div>

                    <div className='editeUser-property editeUser-property-2'>
                        <div className='editeUser-label label'>Роль</div>
                        <Select className={'editeUser-select'}>
                            <Select.Title>{EmployeeRole[user.role]}</Select.Title>
                            <Select.Items>
                                <Select.Item>{EmployeeRole[0]}</Select.Item>
                                <Select.Item>{EmployeeRole[1]}</Select.Item>
                            </Select.Items>
                        </Select>
                    </div>
                </div>

                <div className='editeUser-buttons'>
                    <Button
                        className='editeUser-button editeUser-button-save'
                        onClick={handleSaveUser}
                    >Сохранить</Button>
                    <Button
                        type={'submit'}
                        className='editeUser-button editeUser-button-cancel'
                        onClick={() => onCancel?.()}
                    >Отмена</Button>
                </div>
            </div>

        </div>
    );
}

