import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import { Uri } from "./constants";

const App = () => {
  return (
    <main className="app">
      <Routes>
        <Route path={Uri.Login} element={<Login />} />
        <Route path={Uri.Reports} element={<Reports />} />
      </Routes>
    </main>
  );
};

export default App;
