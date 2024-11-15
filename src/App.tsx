import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Auth";
import List from "./List";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="list" element={<List />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
