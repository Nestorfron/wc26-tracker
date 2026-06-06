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

const AppContext = createContext();

export const AppProvider = ({
  children,
}) => {
  const [teams, setTeams] =
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

  useEffect(() => {
    const loadData = async () => {
      try {

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
          fixturesData?.response ||
            []
        );

        setLiveMatches(
          liveData?.response || []
        );

        setStandings(
          standingsData?.response?.[0]
            ?.league?.standings ||
            []
        );
      } catch (err) {
        console.error(
          "❌ Error:",
          err
        );

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

   

  return (
    <AppContext.Provider
      value={{
        teams,
        matches,
        liveMatches,
        standings,

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