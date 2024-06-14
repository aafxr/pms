import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import {User} from "../../core/classes/employee/User";

import {EmployeeRole} from "../../core/classes/employee/Employee";
import {Select} from "../Select";
import {Button} from "../buttons";
import {Input} from "../Input";
import './EditUser.scss'


export interface EditUserPropsType {
    user: User
    onCancel?: () => void
    onSave?: (user: User) => void
}

export function EditUser({user, onSave, onCancel}: EditUserPropsType) {
    const [editedUser, setEditedUser] = useState<User>();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<User>()


    useEffect(() => {
        setEditedUser(new User(user))
    }, []);


    function handleSaveUser(data: User) {
        console.log(data)
        // if (!editedUser) return
        // onSave?.(editedUser)
    }


    function handleJobTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.jobTitle = e.target.value
        setEditedUser(newState)
    }


    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.email = e.target.value
        setEditedUser(newState)
    }


    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.firstName = e.target.value
        setEditedUser(newState)
    }


    function handleSecondNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.secondName = e.target.value
        setEditedUser(newState)
    }


    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.lastName = e.target.value
        setEditedUser(newState)
    }


    function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.phoneNumber = e.target.value
        setEditedUser(newState)
    }


    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newState = new User(editedUser)
        newState.photo = e.target.value
        setEditedUser(newState)
    }


    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newState = new User(editedUser)
        newState.role = +e.target.value
        setEditedUser(newState)
    }


    if (!editedUser) return null


    return (
        <div className='editeUser'>
            <div className='editeUser-inner'>
                <h2 className='editeUser-title title'>Редактирование данных</h2>

                <div className='editeUser-photo'>
                    <img src={editedUser?.photo}
                         alt={`${editedUser?.firstName} ${editedUser?.secondName} ${editedUser?.lastName}`}/>
                </div>

                <form onSubmit={handleSubmit(handleSaveUser)}>
                    <div className='editeUser-content'>
                        <div className='editeUser-property'>
                            <div className='editeUser-label label'>Фамилия</div>
                            <Input
                                {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: "Необходимо указать Фамилию"
                                    },
                                })}
                                className={'editeUser-input'}
                                placeholder='Фамилия'
                                name={'lastName'}
                                value={editedUser?.lastName}
                                onChange={handleLastNameChange}
                            />
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>

                        <div className='editeUser-property'>
                            <div className='editeUser-label label'>Имя</div>
                            <Input
                                {...register("firstName", {required: {value: true, message: "Необходимо указать Имя"}})}
                                className={'editeUser-input'}
                                placeholder='Имя'
                                name={'firstName'}
                                value={editedUser?.firstName}
                                onChange={handleFirstNameChange}
                            />
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>

                        <div className='editeUser-property'>
                            <div className='editeUser-label label'>Отчество</div>
                            <Input
                                {...register("secondName", {
                                    required: {
                                        value: true,
                                        message: "Необходимо указать Отчкство"
                                    }
                                })}
                                className={'editeUser-input'}
                                placeholder='Отчество'
                                name={'secondName'}
                                value={editedUser?.secondName}
                                onChange={handleSecondNameChange}
                            />
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Телефон</div>
                            <Input
                                {...register("phoneNumber", {
                                    required: {
                                        value: true,
                                        message: "Необходимо указать номер телефона"
                                    }, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                                })}
                                className={'editeUser-input'}
                                type={'tel'} placeholder='Телефон'
                                name={'phoneNumber'}
                                value={editedUser?.phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Эл. почта</div>
                            <Input
                                {...register("email", {
                                    required: {value: true, message: "Необходимо указать email"},
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                                })}
                                className={'editeUser-input'}
                                type={'email'} placeholder='Эл. почта'
                                name={'email'}
                                value={editedUser?.email}
                                onChange={handleEmailChange}
                            />
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Должность</div>
                            <Input
                                {...register("jobTitle", {
                                    required: {
                                        value: true,
                                        message: "Необходимо указать должность"
                                    }
                                })}
                                className={'editeUser-input'}
                                type={'text'} placeholder='Должность'
                                name={'jobTitle'}
                                value={editedUser?.jobTitle}
                                onChange={handleJobTitleChange}
                            />
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Роль</div>
                            <Select
                                {...register("role", {required: {value: true, message: "Необходимо выбрать роль"}})}
                                className='editeUser-select'
                                name={'role'}
                                value={editedUser?.role}
                                onChange={handleRoleChange}
                            >
                                <option value={EmployeeRole.ADMINISTRATOR}>{EmployeeRole[0]}</option>
                                <option value={EmployeeRole.MANAGER}>{EmployeeRole[1]}</option>
                                <option value={EmployeeRole.OPERATOR}>{EmployeeRole[2]}</option>
                            </Select>
                            {errors.firstName &&
                                <div className='editeUser-message'>
                                    {errors.firstName.message}
                                </div>
                            }
                        </div>
                    </div>

                    <div className='editeUser-buttons'>
                        <Button
                            type={'submit'}
                            className='editeUser-button editeUser-button-save'
                        >Сохранить</Button>
                        <Button
                            className='editeUser-button editeUser-button-cancel'
                            onClick={() => onCancel?.()}
                        >Отмена</Button>
                    </div>
                </form>
            </div>

        </div>
    );
}

