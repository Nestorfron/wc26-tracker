import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getTeams } from "../services/teams";
import { getFixtures } from "../services/fixtures";
import { getLiveMatches } from "../services/live";
import { getStandings } from "../services/standings";
import { getPlayers } from "../services/players";

const AppContext = createContext();

export const AppProvider = ({
  children,
}) => {
  const [teams, setTeams] =
    useState([]);

  const [players, setPlayers] =
    useState([]);

  const [matches, setMatches] =
    useState([]);

  const [
    liveMatches,
    setLiveMatches,
  ] = useState([]);

  const [
    standings,
    setStandings,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        teamsData,
        fixturesData,
        liveData,
        standingsData,
      ] = await Promise.all([
        getTeams(),
        getFixtures(),
        getLiveMatches(),
        getStandings(),
      ]);

      setTeams(
        teamsData?.response || []
      );

      setMatches(
        fixturesData?.response || []
      );

      setLiveMatches(
        liveData || []
      );

      setStandings(
        standingsData?.response?.[0]
          ?.league?.standings || []
      );
    } catch (err) {
      console.error(
        "❌ Error:",
        err
      );

      setError(
        err.message ||
          "Error al cargar datos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        try {
          const data =
            await getLiveMatches();

          setLiveMatches(
            data || []
          );
        } catch (err) {
          console.error(
            "Error actualizando partidos en vivo",
            err
          );
        }
      },
      liveMatches.length > 0
        ? 15000
        : 60000
    );

    return () =>
      clearInterval(interval);
  }, [liveMatches.length]);

  const getTeamPlayers =
    async (teamId) => {
      const data =
        await getPlayers(teamId);

      setPlayers(
        data.players || []
      );
    };

  const getTeamInfo = (
    teamId
  ) => {
    const teamStandings =
      standings
        .flat()
        .find(
          (team) =>
            team.team.id === teamId
        );

    const nextMatches =
      matches.filter(
        (match) =>
          match.teams.home.id ===
            teamId ||
          match.teams.away.id ===
            teamId
      );

    return {
      teamStandings,
      nextMatches,
    };
  };

  return (
    <AppContext.Provider
      value={{
        teams,
        matches,
        liveMatches,
        standings,
        players,

        getTeamInfo,
        getTeamPlayers,
        loadData,

        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext =
  () => useContext(AppContext);