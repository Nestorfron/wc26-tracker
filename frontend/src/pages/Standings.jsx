import Header from "../components/Header";
import StandingTable from "../components/StandingTable";
import { standings } from "../data/MockData";

export default function Standings() {
  return (
    <div className="p-4">
      <Header
        title="Posiciones"
        subtitle="Fase de grupos"
      />

      {Object.entries(standings).map(
        ([group, teams]) => (
          <div
            key={group}
            className="mb-6"
          >
            <h2 className="mb-3 font-semibold">
              Grupo {group}
            </h2>

            <StandingTable
              teams={teams}
            />
          </div>
        )
      )}
    </div>
  );
}