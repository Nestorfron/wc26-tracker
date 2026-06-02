import Header from "../components/Header";
import TeamCard from "../components/TeamCard";
import { teams } from "../data/MockData";

export default function Teams() {
  const groupedTeams = teams.reduce(
    (acc, team) => {
      const group =
        team.group_name || "Sin grupo";

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(team);

      return acc;
    },
    {}
  );

  const sortedGroups = Object.keys(
    groupedTeams
  ).sort();

  return (
    <div className="p-4 pb-24">
      <Header
        title="Equipos"
        subtitle="Selecciones participantes"
      />

      <div className="space-y-6">
        {sortedGroups.map((group) => (
          <div key={group}>
            <h2
              className="
              text-lg
              font-bold
              mb-3
              text-text
              "
            >
              Grupo {group}
            </h2>

            <div
              className="
              grid
              grid-cols-2
              gap-3
              "
            >
              {groupedTeams[group].map(
                (team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}