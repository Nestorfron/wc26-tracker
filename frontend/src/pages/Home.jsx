import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";


import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";


export default function Home() {
  const navigate = useNavigate();

  const {
    matches = [],
    teams = [],
    liveMatches = [],
    loading,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  const nextMatches = matches.filter(
    (match) =>  match.fixture.status.long === "Not Started");


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTeams = useMemo(() => {
    if (!search.trim()) return [];

    return teams
      .filter((team) =>
        team.team.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.team.name.localeCompare(b.team.name))
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
      <div ref={searchRef} className="relative mb-8">
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
          <Search size={20} className="text-zinc-500" />

          <input
            type="text"
            value={search}
            placeholder="Buscar selección..."
            onFocus={() => setShowResults(true)}
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

      
        {/* Live Matches */}
        {liveMatches.live.length> 0 && (
          <div
          className={`my-8 ${
            liveMatches.live.length > 1
              ? "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
              : ""
          }`}
        >
          {liveMatches.live.map((match) => (
            <div
              key={match.fixture.id}
              className="
                snap-center
                shrink-0
                rounded-3xl
                border border-red-500/30
                bg-white/60 dark:bg-zinc-900/60
                backdrop-blur-xl
                p-5
                shadow-lg
              "
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-red-500 animate-pulse">
                  EN VIVO · {match.fixture.status.elapsed}'
                </span>
        
                <span className="text-xs text-zinc-500">
                  {match.fixture.venue.name}
                </span>
              </div>
        
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="flex flex-col items-center">
                  <img
                    src={match.teams.home.logo}
                    alt={match.teams.home.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="mt-2 font-medium text-center">
                    {match.teams.home.name}
                  </span>
                </div>
        
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {match.goals.home} - {match.goals.away}
                  </div>
        
                  <div className="text-xs text-zinc-500 mt-1">
                    {match.fixture.status.long}
                  </div>
                </div>
        
                <div className="flex flex-col items-center">
                  <img
                    src={match.teams.away.logo}
                    alt={match.teams.away.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="mt-2 font-medium text-center">
                    {match.teams.away.name}
                  </span>
                </div>
              </div>
        
              {match.events?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold mb-2">
                    Últimos eventos
                  </h4>
        
                  <div className="space-y-2">
                    {match.events
                      .slice(-3)
                      .reverse()
                      .map((event, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {event.type === "Goal" ? "⚽" : "🟨"}{" "}
                            {event.player.name}
                          </span>
        
                          <span className="text-zinc-500">
                            {event.time.elapsed}'
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        )}

        

        {showResults && search && filteredTeams.length > 0 && (
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
                onClick={() => handleSelectTeam(team)}
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

                <span className="font-medium">{team.team.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Matches */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Próximos partidos</h2>
      </div>

      <div className="space-y-3">
        {nextMatches.slice(0, 5).map((match, index) => (
          <MatchCard key={index + 1} match={match} />
        ))}
      </div>
    </div>
  );
}
