import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import { fixtures } from "../data/MockData";

export default function Fixtures() {
  return (
    <div className="p-4">
      <Header
        title="Fixture"
        subtitle="Calendario completo"
      />

      <div className="space-y-3">
        {fixtures.map((match) => (
          <MatchCard
            key={match.id}
            {...match}
          />
        ))}
      </div>
    </div>
  );
}