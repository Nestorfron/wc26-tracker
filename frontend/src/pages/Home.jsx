import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import { fixtures } from "../data/MockData";

export default function Home() {
  return (
    <div className="p-4 pb-24">
      <Header title="WC26 Tracker" />
      <h2 className="mb-4 font-semibold">
        Próximos partidos
      </h2>

      <div className="space-y-3">
        {fixtures.slice(0, 5).map((match) => (
          <MatchCard
            key={match.id}
            {...match}
          />
        ))}
      </div>
    </div>
  );
}