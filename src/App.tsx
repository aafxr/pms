import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {Main} from "./pages";

function App() {
  return (
      <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
  );
}

export default App;
