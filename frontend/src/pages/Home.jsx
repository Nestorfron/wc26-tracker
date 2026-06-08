import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";


import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import PlayoffBracket from "../components/PayoffBracket";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const navigate = useNavigate();

  const {
    matches = [],
    teams = [],
    loading,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const filteredTeams = useMemo(() => {
    if (!search.trim()) return [];

    return teams
      .filter((team) =>
        team.team.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) =>
        a.team.name.localeCompare(b.team.name)
      )
      .slice(0, 8);
  }, [search, teams]);

  const handleSelectTeam = (team) => {
    setSearch("");
    setShowResults(false);

    navigate(`/team/${team.team.id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 pb-24">
      <Header title="WC26 Tracker" />

      {/* Search Team */}
      <div
        ref={searchRef}
        className="relative mb-8"
      >
        <div
          className="
            flex items-center gap-3
            rounded-3xl
            border border-white/10
            bg-white/60 dark:bg-zinc-900/60
            backdrop-blur-xl
            px-4 py-3
            shadow-lg
          "
        >
          <Search
            size={20}
            className="text-zinc-500"
          />

          <input
            type="text"
            value={search}
            placeholder="Buscar selección..."
            onFocus={() =>
              setShowResults(true)
            }
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            className="
              w-full
              bg-transparent
              outline-none
              text-sm
            "
          />
        </div>

        {/* Sección del Cuadro / Playoff */}
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-4 mt-4 text-zinc-800 dark:text-zinc-200">
          Fase de Eliminatorias
        </h2>
        <PlayoffBracket />
      </div>

        {showResults &&
          search &&
          filteredTeams.length > 0 && (
            <div
              className="
                absolute z-50 mt-2 w-full
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/90 dark:bg-zinc-900/95
                backdrop-blur-xl
                shadow-2xl
              "
            >
              {filteredTeams.map((team) => (
                <button
                  key={team.team.id}
                  onClick={() =>
                    handleSelectTeam(team)
                  }
                  className="
                    flex items-center gap-3
                    w-full
                    px-4 py-3
                    text-left
                    transition
                    hover:bg-black/5
                    dark:hover:bg-white/5
                  "
                >
                  <img
                    src={team.team.logo}
                    alt={team.team.name}
                    className="w-8 h-8 object-contain"
                  />

                  <span className="font-medium">
                    {team.team.name}
                  </span>
                </button>
              ))}
            </div>
          )}
      </div>

      {/* Matches */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">
          Próximos partidos
        </h2>
      </div>

      <div className="space-y-3">
        {matches.slice(0, 5).map((match,index) => (
          <MatchCard
            key={index + 1}
            match={match}
          />
        ))}
      </div>
    </div>
  );
}