import { CalendarDays, Clock3, Group, MapPin } from "lucide-react";

export default function MatchCard({ match }) {
  
  const homeTeam = match?.teams?.home;
  const awayTeam = match?.teams?.away;

  const dateObj = new Date(match.fixture.date);

  const date = dateObj.toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "2-digit",
  });

  const time = dateObj.toLocaleTimeString("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const stadium = match.fixture?.venue?.name || "Por confirmar";

  const round = match.league?.round || match.stage || "";

  const stageLabels = {
    "Group Stage - 3": "Fase de Grupos 3",
    "Group Stage - 2": "Fase de Grupos 2",
    "Group Stage - 1": "Fase de Grupos 1",
    round16: "Octavos de Final",
    quarterfinal: "Cuartos de Final",
    semifinal: "Semifinales",
    third_place: "Tercer Puesto",
    final: "Final",
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/60 dark:bg-zinc-900/60
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        p-5
      "
    >
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Ronda */}
      <div className="flex justify-center mb-4">
        <span
          className="
            px-3 py-1
            text-xs
            font-semibold
            rounded-full
            bg-blue-500/10
            text-blue-500
          "
        >
          {stageLabels[round]}
        </span>
      </div>

      {/* Equipos */}
      <div className="flex items-center justify-between">
        {/* Local */}
        <div className="flex flex-col items-center w-28">
          <img
            src={homeTeam.logo}
            alt={homeTeam.name}
            className="
              w-16 h-16
              object-contain
            "
          />

          <span
            className="
              mt-3
              text-sm
              font-semibold
              text-center
              leading-tight
            "
          >
            {homeTeam.name}
          </span>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <div
            className="
              w-14 h-14
              rounded-full
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              flex items-center justify-center
              text-white
              font-bold
              shadow-lg
            "
          >
            VS
          </div>
        </div>

        {/* Visitante */}
        <div className="flex flex-col items-center w-28">
          <img
            src={awayTeam.logo}
            alt={awayTeam.name}
            className="
              w-16 h-16
              object-contain
            "
          />

          <span
            className="
              mt-3
              text-sm
              font-semibold
              text-center
              leading-tight
            "
          >
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          mt-6
          pt-4
          border-t
          border-white/10
        "
      >
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock3 size={14} />
            <span>{time}</span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-full
              bg-black/5
              dark:bg-white/5
              text-xs
            "
          >
            <MapPin size={14} />
            <span>{stadium}</span>
          </div>
        </div>
      </div>
    </div>
  );
}