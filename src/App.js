import React, { useEffect } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page/home-page";

import { useTheme } from "./hooks/use-theme";

import "./scss/index.scss";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [theme, changeTheme] = useTheme();

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar changeTheme={changeTheme} currentTheme={theme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}
