import React, {useEffect} from 'react';
import {useUser} from "../../hooks/useUser";
import {useAppDispatch} from "../../hooks";
import {setUser} from "../../redux";
import {User} from "../../core/classes/employee/User";
import {EmployeeRole} from "../../core/classes/employee/Employee";
import {Outlet} from "react-router-dom";


const defaultUser = new User({
    jobTitle: 'manager',
    email: 'user@gmail.com',
    firstName: 'ivan',
    secondName: 'ivanovich',
    lastName: 'ivanov',
    phoneNumber: '89998887766',
    photo: '',
    role: EmployeeRole.ADMINISTRATOR,
})


export function AuthRequired() {
    const {user, loading} = useUser()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user) dispatch(setUser(defaultUser))
    }, []);


    if (loading) return (<div>Loading...</div>)


    return (
        <Outlet/>
    );
}

