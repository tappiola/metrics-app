import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

const App = () => {
  return (
    <main className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Reports />} />
      </Routes>
    </main>
  );
};

export default App;
