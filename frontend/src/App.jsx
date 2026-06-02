import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import AppRouter from "./routes/AppRouter";

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
        <AppRouter />
      </BrowserRouter>

      {updateAvailable && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 text-white p-4 text-center">
          <p>Nueva versión disponible</p>

          <button
            onClick={handleUpdate}
            className="mt-2 px-4 py-2 bg-green-600 rounded-lg"
          >
            Actualizar
          </button>
        </div>
      )}
    </>
  );
}

export default App;