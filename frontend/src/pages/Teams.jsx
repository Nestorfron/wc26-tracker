import Header from "../components/Header";
import TeamCard from "../components/TeamCard";
import Loading from "../components/Loading";
import ErrorState from "../components/onRetry";
import { useAppContext } from "../context/AppContext";

export default function Teams() {
    const { teams, loading, error, loadData } = useAppContext();

    if (error) return <ErrorState onRetry={loadData} />;

    if (loading) return <Loading />;


  return (
    <div className="p-4 pb-24 max-w-[800px] mx-auto">
      <Header
        title="Equipos"
        subtitle="Selecciones participantes"
      />

      <div className="space-y-6">
        

            <div
              className="
              grid
              grid-cols-2
              gap-3
              "
            >
              {teams.map(
                (team, index) => (
                  <TeamCard
                    key={index + 1}
                    team={team.team}
                  />
                )
              )}
            </div>
          </div>

    </div>
  );
}