import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {Main, SettingsPage, ReservationPage, Profile} from "./pages";
import {AuthRequired} from "./wrappers";

function App() {
    return (
        <Routes>
            <Route element={<AuthRequired/>}>
                <Route path="/" element={<Main/>}/>
                <Route path="/reservation" element={<ReservationPage/>}/>
                <Route path="/settings/companyList" element={<SettingsPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Route>
        </Routes>
    );
}

export default App;
