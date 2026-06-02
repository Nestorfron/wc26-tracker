import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateSW, setUpdateSW] = useState(() => () => {});

  useEffect(() => {
    const updateServiceWorker = registerSW({
      onNeedRefresh() {
        setUpdateAvailable(true);
      },
      onOfflineReady() {
        console.log("App lista para funcionar offline 🚀");
      },
    });

    setUpdateSW(() => updateServiceWorker);
  }, []);

  const handleUpdate = () => {
    updateSW();
    setUpdateAvailable(false);
    window.location.reload();
  };

  return (
    <>
      <BrowserRouter>
        <ThemeToggle />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} /> 
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <BottomNav />

      </BrowserRouter>

      {updateAvailable && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#333",
            color: "#fff",
            padding: "1rem",
            textAlign: "center",
            zIndex: 9999,
          }}
        >
          🔄 Nueva versión disponible.&nbsp;
          <button
            onClick={handleUpdate}
            style={{
              cursor: "pointer",
              background: "#fff",
              color: "#333",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            Actualizar
          </button>
        </div>
      )}
    </>
  );
}

export default App;
