import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Fixtures from "../pages/Fixtures";
import Standings from "../pages/Standings";
import Teams from "../pages/Teams";
import Settings from "../pages/Settings";

import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}