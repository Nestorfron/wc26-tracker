import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";

import MatchCard from "../components/MatchCard";

export default function TeamPage() {
  const { id } = useParams();

  const { teams, standings, matches } = useAppContext();

  const team = useMemo(() => {
    return teams.find((t) => t.team.id === Number(id));
  }, [teams, id]);

  const teamStanding = useMemo(() => {
    for (const group of standings) {
      const found = group.find((t) => t.team.id === Number(id));

      if (found) return found;
    }

    return null;
  }, [standings, id]);

  const groupTable = useMemo(() => {
    if (!teamStanding) return [];

    for (const group of standings) {
      const exists = group.some((t) => t.team.id === Number(id));

      if (exists) return group;
    }

    return [];
  }, [standings, teamStanding, id]);

  const teamMatches = useMemo(() => {
    return matches.filter(
      (match) =>
        match.teams.home.id === Number(id) || match.teams.away.id === Number(id)
    );
  }, [matches, id]);

  const upcomingMatches = useMemo(() => {
    return teamMatches.filter((match) => match.fixture.status.short === "NS");
  }, [teamMatches]);

  const finishedMatches = useMemo(() => {
    return teamMatches.filter(
      (match) =>
        match.fixture.status.short === "FT" ||
        match.fixture.status.short === "AET" ||
        match.fixture.status.short === "PEN"
    );
  }, [teamMatches]);

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-8">Selección no encontrada</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <Header />

      <div className="rounded-3xl border border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-6">
        <div className="flex items-center gap-4">
          <img
            src={team.team.logo}
            alt={team.team.name}
            className="w-16 h-16 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold">{team.team.name}</h1>

            {teamStanding && (
              <p className="text-zinc-500">
                Grupo {teamStanding.group} • Posición #{teamStanding.rank}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabla del grupo */}
      {groupTable.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-5">
          <h2 className="text-xl font-bold mb-4">Tabla del Grupo</h2>

          <div className="space-y-2">
            {groupTable.map((club) => (
              <div
                key={club.team.id}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  club.team.id === Number(id)
                    ? "bg-blue-500/20"
                    : "bg-black/5 dark:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{club.rank}</span>

                  <img
                    src={club.team.logo}
                    alt={club.team.name}
                    className="w-6 h-6"
                  />

                  <span>{club.team.name}</span>
                </div>

                <span className="font-bold">{club.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximos partidos */}
      <section>
        <h2 className="text-xl font-bold mb-4">Próximos partidos</h2>

        <div className="grid gap-4">
          {upcomingMatches.map((match, index) => (
            <MatchCard key={index + 1} match={match} />
          ))}
        </div>
      </section>

      {/* Resultados */}
     

        <section>
          <h2 className="text-xl font-bold mb-4">Resultados</h2>

          {finishedMatches.length > 0 ? (
            <div className="grid gap-4">
              {finishedMatches.map((match) => (
                <div
                  key={match.fixture.id}
                  className="rounded-2xl border border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <span>{match.teams.home.name}</span>

                    <span className="font-bold text-lg">
                      {match.goals.home} - {match.goals.away}
                    </span>

                    <span>{match.teams.away.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[220px] text-center mb-6">
              <div className="text-5xl mb-4">🏟️</div>

              <h3 className="text-lg font-semibold">Sin resultados todavía</h3>


              <p className="mt-1 text-sm text-text/40">
                Los resultados aparecerán aquí cuando termine su primer
                encuentro.
              </p>
            </div>
          )}
        </section>
      
    </div>
  );
}
