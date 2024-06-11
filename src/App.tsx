import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {Main, ReservationPage} from "./pages";

function App() {
  return (
      <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
  );
}

export default App;
