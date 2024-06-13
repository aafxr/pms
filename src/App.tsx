import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {Main, PropertyListPage, ReservationPage} from "./pages";

function App() {
  return (
      <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/settings/propertyList" element={<PropertyListPage />} />
            <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
  );
}

export default App;
