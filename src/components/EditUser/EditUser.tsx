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

    console.log(errors)


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
                                {...register("lastName", {required: true})}
                                className={'editeUser-input'}
                                placeholder='Фамилия' value={editedUser?.lastName}/>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
                        </div>

                        <div className='editeUser-property'>
                            <div className='editeUser-label label'>Имя</div>
                            <Input
                                {...register("firstName", {required: true})}
                                className={'editeUser-input'}
                                placeholder='Имя' value={editedUser?.firstName}/>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
                        </div>

                        <div className='editeUser-property'>
                            <div className='editeUser-label label'>Отчество</div>
                            <Input
                                {...register("secondName", {required: true})}
                                className={'editeUser-input'}
                                placeholder='Отчество' value={editedUser?.secondName}/>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Телефон</div>
                            <Input
                                {...register("phoneNumber", {required: true})}
                                className={'editeUser-input'}
                                type={'tel'} placeholder='Телефон'
                                value={editedUser?.phoneNumber}/>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Эл. почта</div>
                            <Input
                                {...register("email", {required: true})}
                                className={'editeUser-input'}
                                type={'email'} placeholder='Эл. почта'
                                value={editedUser?.email}/>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Должность</div>
                            <Input
                                {...register("jobTitle", {required: true})}
                                className={'editeUser-input'}
                                type={'text'} placeholder='Должность'
                                value={editedUser?.jobTitle}/>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
                        </div>

                        <div className='editeUser-property editeUser-property-2'>
                            <div className='editeUser-label label'>Роль</div>
                            <Select
                                {...register("role", {required: true})}
                                className='editeUser-select'>
                                <option value={EmployeeRole.ADMINISTRATOR}>{EmployeeRole[0]}</option>
                                <option value={EmployeeRole.MANAGER}>{EmployeeRole[1]}</option>
                                <option value={EmployeeRole.OPERATOR}>{EmployeeRole[2]}</option>
                            </Select>
                            {errors.firstName && <div className='editeUser-message'>
                                this field is required
                            </div>}
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

