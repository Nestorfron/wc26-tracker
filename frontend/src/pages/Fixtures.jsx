import { useMemo, useState } from "react";

import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import { useAppContext } from "../context/AppContext";

/* -----------------------------
   Helpers
----------------------------- */

const todayStr = new Date().toLocaleDateString("sv-SE");

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const formatDate = (date) => date.toLocaleDateString("sv-SE");

/* -----------------------------
   Component
----------------------------- */

export default function Fixtures() {
  const { matches = [] } = useAppContext();

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    { label: "Junio 2026", value: 5 },
    { label: "Julio 2026", value: 6 },
  ];

  /* -----------------------------
     Obtener partidos por fecha
  ----------------------------- */
  const getMatchesByDate = (dateStr) =>
    matches.filter((match) => {
      const matchDate = match.fixture.date.split("T")[0];
      return matchDate === dateStr;
    });

  /* -----------------------------
     Mes actual del calendario
  ----------------------------- */
  const days = useMemo(() => {
    return getMonthDays(2026, currentMonth);
  }, [currentMonth]);

  /* -----------------------------
     Fecha activa
  ----------------------------- */
  const activeDate = selectedDate || todayStr;

  const filteredFixtures = getMatchesByDate(activeDate).sort(
    (a, b) =>
      new Date(a.fixture.date) - new Date(b.fixture.date)
  );

  const hasMatches = filteredFixtures.length > 0;

  return (
    <div className="p-4 pb-24">
      <Header
        title="Fixture"
        subtitle="Calendario Mundial 2026"
      />

      {/* SELECTOR DE MES */}
      <div className="flex gap-2 mt-4 mb-4">
        {months.map((m) => (
          <button
            key={m.value}
            onClick={() => {
              setCurrentMonth(m.value);
              setSelectedDate(null);
            }}
            className={`
              px-3 py-1 rounded-full text-sm transition
              ${
                currentMonth === m.value
                  ? "bg-accent text-black"
                  : "bg-card text-text"
              }
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* CALENDARIO */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateStr = formatDate(day);

          const matchesForDay = getMatchesByDate(dateStr);

          const hasMatches = matchesForDay.length > 0;

          const isSelected = selectedDate === dateStr;

          const isToday = todayStr === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`
                aspect-square
                rounded-xl
                flex
                flex-col
                items-center
                justify-center
                text-xs
                transition
                relative

                ${
                  isSelected
                    ? "bg-accent text-black"
                    : hasMatches
                    ? "bg-card border border-accent/40"
                    : "bg-card opacity-30"
                }

                ${
                  isToday && !isSelected
                    ? "ring-2 ring-accent"
                    : ""
                }
              `}
            >
              <span className="font-medium">
                {day.getDate()}
              </span>

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
            <MatchCard
              key={match.fixture.id}
              match={match}
            />
          ))
        ) : (
          <div className="text-center mt-10">
            <p className="text-text/60">
              No hay partidos este día
            </p>

            <p className="text-text/40 text-sm mt-1">
              Selecciona otra fecha en el calendario
            </p>
          </div>
        )}
      </div>
    </div>
  );
}