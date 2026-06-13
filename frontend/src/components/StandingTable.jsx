 


export default function StandingTable({ teams }) {



  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-card
        backdrop-blur-xl
        shadow-glass
        bg-white/70 dark:bg-zinc-900/70
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-white/10
              bg-black/5
              dark:bg-white/5
            "
          >
            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
              #
            </th>

            <th className="text-left text-xs font-semibold uppercase tracking-wider opacity-70">
              Equipo
            </th>

            <th className="text-center text-xs font-semibold uppercase tracking-wider opacity-70">
              PTS
            </th>

            <th className="text-center text-xs font-semibold uppercase tracking-wider opacity-70">
              PJ
            </th>

            <th className="text-center text-xs font-semibold uppercase tracking-wider opacity-70">
              PG
            </th>

            <th className="text-center text-xs font-semibold uppercase tracking-wider opacity-70">
              PP
            </th>

            <th className="text-center text-xs font-semibold uppercase tracking-wider opacity-70">
              PE
            </th>

            <th className="text-center text-xs font-semibold uppercase tracking-wider opacity-70">
              DG
            </th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => (
            <tr
              key={index + 1}
              className="
                border-b
                border-white/5
                hover:bg-black/5
                dark:hover:bg-white/5
                transition-colors
              "
            >
              {/* Posición */}
              <td className="p-4">
                <div
                  className={`
                    w-7 h-7 rounded-full
                    flex items-center justify-center
                    text-xs font-bold
                    ${
                      index < 2
                        ? "bg-green-500/15 text-green-500"
                        : "bg-zinc-500/10 text-zinc-500"
                    }
                  `}
                >
                  {index + 1}
                </div>
              </td>

              {/* Equipo */}
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={team.team.logo}
                    alt={team.name}
                    className="
                      w-8
                      h-6
                      rounded
                      object-cover
                      shadow-sm
                    "
                  />

                  <span className="font-medium">
                    {team.team.name}
                  </span>
                </div>
              </td>

              {/* Estadísticas */}
              <td className="text-center font-bold">
                {team.points}
              </td>

              <td className="text-center opacity-80">
                {team.all.played}
              </td>

              <td className="text-center opacity-80">
                {team.all.win}
              </td>

              <td className="text-center opacity-80">
                {team.all.draw}
              </td>

              <td className="text-center opacity-80">
                {team.all.lose}
              </td>

              <td className="text-center opacity-80">
                {team.goalsDiff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="
          px-4 py-3
          text-xs
          opacity-60
          border-t
          border-white/10
        "
      >
        🟢 Clasificación directa
      </div>
    </div>
  );
}