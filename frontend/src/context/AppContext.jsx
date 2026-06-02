import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { fetchData } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fixtures, setFixtures] = useState([]);
  const [matches, setMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);
  const [players, setPlayers] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [
        matchesData,
        teamsData,
        standingsData,
        playersData,
        fixturesData,
        liveMatchesData,
      ] = await Promise.all([
        fetchData("/matches"),
        fetchData("/teams"),
        fetchData("/standings"),
        fetchData("/players"),
        fetchData("/fixtures"),
        fetchData("/live-matches"),
      ]);

      setMatches(matchesData || []);
      setTeams(teamsData || []);
      setStandings(standingsData || []);
      setPlayers(playersData || []);
      setFixtures(fixturesData || []);
      setLiveMatches(liveMatchesData || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
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
        teams,
        standings,
        players,
        fixtures,
        liveMatches,

        setMatches,
        setTeams,
        setStandings,
        setPlayers,
        setFixtures,
        setLiveMatches,

        loading,
        error,

        refreshData: loadInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () =>
  useContext(AppContext);