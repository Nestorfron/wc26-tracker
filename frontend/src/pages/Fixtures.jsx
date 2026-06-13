import { useMemo, useState } from "react";
import { CalendarX2 } from "lucide-react";

import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import ErrorState from "../components/onRetry";
import { useAppContext } from "../context/AppContext";

import { knockoutMatches } from "../data/mockKnockout";

/* -----------------------------
   Helpers UTC SAFE
----------------------------- */
const todayStr = new Date().toISOString().split("T")[0];

const toDateKey = (date) => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


/* -----------------------------
   Calendario
----------------------------- */
const getMonthDays = (year, month) => {
  const date = new Date(Date.UTC(year, month, 1));
  const days = [];

  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }

  return days;
};

/* -----------------------------
   Component
----------------------------- */
export default function Fixtures() {
  const { matches = [], loading, error, loadData } = useAppContext();

  const allMatches = [...matches, ...knockoutMatches];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    { label: "Junio 2026", value: 5 },
    { label: "Julio 2026", value: 6 },
  ];

  /* -----------------------------
     Filtrar partidos
  ----------------------------- */
  const getMatchesByDate = (dateStr) =>
    allMatches.filter(
      (match) => toDateKey(match.fixture.date) === dateStr
    );

  /* -----------------------------
     Calendario mes
  ----------------------------- */
  const days = useMemo(() => {
    return getMonthDays(2026, currentMonth);
  }, [currentMonth]);

  const activeDate = selectedDate || todayStr;

  const filteredFixtures = getMatchesByDate(activeDate).sort(
    (a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)
  );

  const hasMatches = filteredFixtures.length > 0;

  if (error) return <ErrorState onRetry={loadData} />;

  if (loading) return <Loading />;

  return (
    <div className="p-4 pb-24 max-w-[800px] mx-auto">
      <Header title="Fixture" subtitle="Calendario Mundial 2026" />

      {/* MES */}
      <div className="flex gap-2 mt-4 mb-4">
        {months.map((m) => (
          <button
            key={m.value}
            onClick={() => {
              setCurrentMonth(m.value);
              setSelectedDate(null);
            }}
            className={`px-3 py-1 rounded-full text-sm transition ${
              currentMonth === m.value
                ? "bg-accent text-black"
                : "bg-card text-text"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* CALENDARIO */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateStr = day.toISOString().split("T")[0];

          const matchesForDay = getMatchesByDate(dateStr);

          const hasMatches = matchesForDay.length > 0;
          const isSelected = selectedDate === dateStr;
          const isToday = todayStr === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs transition relative ${
                isSelected
                  ? "bg-accent text-black"
                  : hasMatches
                  ? "bg-card border border-accent/40"
                  : "bg-card opacity-30"
              } ${isToday && !isSelected ? "ring-2 ring-accent" : ""}`}
            >
              <span className="font-medium">{day.getUTCDate()}</span>

              {hasMatches && (
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* RESET */}
      {selectedDate && (
        <button
          onClick={() => setSelectedDate(null)}
          className="mt-4 text-sm text-accent underline"
        >
          Ver partidos de hoy
        </button>
      )}

      {/* PARTIDOS */}
      <div className="mt-6 space-y-3">
        {hasMatches ? (
          filteredFixtures.map((match) => (
            <MatchCard key={match.fixture.id} match={match} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[320px] text-center">
            <CalendarX2 size={56} className="mb-4 text-zinc-400" />

            <h3 className="text-lg font-semibold">
              No hay partidos este día
            </h3>

            <p className="mt-1 text-sm text-text/40">
              Selecciona otra fecha en el calendario.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}