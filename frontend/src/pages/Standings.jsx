import Header from "../components/Header";
import StandingTable from "../components/StandingTable";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";


export default function Standings() {
  const { standings, loading } = useAppContext();

  if (loading) return <Loading />;


  return (
    <div className="p-4 pb-24 max-w-[800px] mx-auto">
      <Header title="Posiciones" subtitle="Fase de grupos" />

      {standings.map((groupTeams, index) => (
        <div key={index} className="mb-6">
          <h2 className="mb-3 font-semibold">{groupTeams[0]?.group}</h2>

          <StandingTable teams={groupTeams} />
        </div>
      ))}
    </div>
  );
}
