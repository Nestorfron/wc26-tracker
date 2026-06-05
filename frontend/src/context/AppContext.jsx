import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import {
  getMatches,
  getLiveMatches,
  getTeams,
  getStandings,
} from "../services/football";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        matchesResponse,
        liveResponse,
        teamsResponse,
        standingsResponse,
      ] = await Promise.all([
        getMatches(),
        getLiveMatches(),
        getTeams(1, 2026),
        getStandings(1, 2026),
      ]);

      console.log(teamsResponse);


      setMatches(matchesResponse?.response || []);
      setLiveMatches(liveResponse?.response || []);
      setTeams(teamsResponse?.response || []);

      setStandings(
        standingsResponse?.response?.[0]?.league?.standings?.[0] || []
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        matches,
        liveMatches,
        teams,
        standings,

        setMatches,
        setLiveMatches,
        setTeams,
        setStandings,

        loading,
        error,

        refreshData: loadInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);