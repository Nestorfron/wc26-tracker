import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { matches = [] } = useAppContext();


  return (
    <div className="p-4 pb-24">
      <Header title="WC26 Tracker" />
      <h2 className="mb-4 font-semibold">
        Próximos partidos
      </h2>

      <div className="space-y-3">
        {matches.slice(0, 5).map((match, index) => (
          <MatchCard
              key={index + 1}
              match={match}
            />
        ))}
      </div>
    </div>
  );
}