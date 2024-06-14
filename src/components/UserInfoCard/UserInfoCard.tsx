import React from 'react';
import {User} from "../../core/classes/employee/User";
import {Button} from "../buttons";

import './UserInfoCard.scss'
import {EmployeeRole} from "../../core/classes/employee/Employee";
import {ChengPassKeyIcon, ExitIcon, MailIcon, PhoneIcon, RoleIcon} from "../svg";

export interface UserInfoCardPropsType {
    className?: string;
    user: User
    onEdit?: (user: User) => void
    onChangePass?: (user: User) => void
    onLogout?: (user: User) => void
}

export function UserInfoCard({user, className, onEdit, onChangePass, onLogout}: UserInfoCardPropsType): JSX.Element {
    return (
        <div className='userInfo'>
            <div className='userInfo-title title'>Профиль</div>
            <div className='userInfo-inner'>
                <div className='userInfo-data'>

                    <div className='userInfo-photo'>
                        <img className='userInfo-image image' src={user.photo}
                             alt={`${user.firstName} ${user.secondName} ${user.lastName}`}/>
                    </div>

                    <div className='userInfo-content'>
                        <div className='userInfo-name'>{`${user.firstName} ${user.secondName} ${user.lastName}`}</div>
                        <div className='userInfo-jobTitle'>{user.jobTitle}</div>
                        <div className='userInfo-role'>
                            <RoleIcon className='userInfo-icon icon-24'/>
                            {EmployeeRole[user.role]}</div>
                        <div className='userInfo-email'>
                            <MailIcon className='userInfo-icon icon-24'/>
                            {user.email}</div>
                        <div className='userInfo-phone'>
                            <PhoneIcon className='userInfo-icon icon-24'/>
                            {user.phoneNumber}</div>
                        <Button className={'userInfo-button userInfo-button-edite'}
                                onClick={() => onEdit?.(user)}>Редактировать</Button>
                    </div>
                </div>
                <div className='userInfo-buttons'>
                    <Button className='userInfo-button userInfo-button-footer' onClick={() => onChangePass?.(user)}>
                        <ChengPassKeyIcon className='icon-20'/>Сменить пароль
                    </Button>
                    <Button className='userInfo-button userInfo-button-footer' onClick={() => onLogout?.(user)}>
                        <ExitIcon className='icon-20'/>
                        Выйти
                    </Button>
                </div>
            </div>
        </div>
    );
}

