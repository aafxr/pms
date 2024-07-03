import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {Main, SettingsPage, Profile} from "./pages";
import {AuthRequired} from "./wrappers";
import {Dev} from "./pages/Dev/Dev";

function App() {
    return (
        <Routes>
            <Route element={<AuthRequired/>}>
                <Route path="/" element={<Main/>}/>
                <Route path="/settings/companyList" element={<SettingsPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dev/" element={<Dev/>}/>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Route>
        </Routes>
    );
}

export default App;
