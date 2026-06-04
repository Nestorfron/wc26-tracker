export const flags = {
  Argentina: "ar",
  Australia: "au",
  Austria: "at",
  Belgium: "be",
  "Bosnia & Herzegovina": "ba",
  Brazil: "br",
  Canada: "ca",
  Chile: "cl",
  "Cote d'Ivoire": "ci",
  Colombia: "co",
  Croatia: "hr",
  Curaçao: "cw",
  Czechia: "cz",
  Ecuador: "ec",
  Egypt: "eg",
  England: "gb-eng",
  France: "fr",
  Germany: "de",
  Ghana: "gh",
  "IR Iran": "ir",
  Iraq: "iq",
  Japan: "jp",
  Jordan: "jo",
  Mexico: "mx",
  Morocco: "ma",
  Netherlands: "nl",
  Norway: "no",
  "New Zealand": "nz",
  Panama: "pa",
  Paraguay: "py",
  Portugal: "pt",
  Scotland: "gb-sct",
  Senegal: "sn",
  "Saudi Arabia": "sa",
  "South Africa": "za",
  "Korea Republic": "kr",
  Spain: "es",
  Sweden: "se",
  Switzerland: "ch",
  Tunisia: "tn",
  Türkiye: "tr",
  Uruguay: "uy",
  "United States": "us",
  Qatar: "qa",
  Haiti: "ht",
  Uzbekistan: "uz",
  Algeria: "dz",
  "Cabo Verde": "cv",
  "DR Congo": "cd",
};

import { CalendarDays, Clock3, MapPin } from "lucide-react";

export default function MatchCard({
  team1,
  team2,
  date,
  time,
  group,
  ground,
  round,
}) {
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
      {/* Glow decorativo */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Fase */}
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
          {round}
        </span>
      </div>

      {/* Equipos */}
      <div className="flex items-center justify-between">
        {/* Local */}
        <div className="flex flex-col items-center w-28">
          <img
            src={`https://flagcdn.io/${flags[team1]}.svg`}
            alt={team1}
            className="
                w-16 h-16
                rounded-2xl
                object-cover
                shadow-md
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
            {team1}
          </span>
        </div>

        {/* Centro */}
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

          {group && (
            <span
              className="
                  mt-3
                  text-xs
                  font-medium
                  text-zinc-500
                  dark:text-zinc-400
                "
            >
              {group}
            </span>
          )}
        </div>

        {/* Visitante */}
        <div className="flex flex-col items-center w-28">
          <img
            src={`https://flagcdn.io/${flags[team2]}.svg`}
            alt={team2}
            className="
                w-16 h-16
                rounded-2xl
                object-cover
                shadow-md
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
            {team2}
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
            <span>{ground}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
