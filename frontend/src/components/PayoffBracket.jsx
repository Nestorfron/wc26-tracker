import React from "react";

// Datos de ejemplo optimizados
const DEFAULT_STAGES = {
  cuartos: [
    { id: 1, homeFlag: "🇪🇸", homeScore: "2", awayFlag: "Alemania", awayFlagEmoji: "🇩🇪", awayScore: "1", win: "home" },
    { id: 2, homeFlag: "🇵🇹", homeScore: "0", awayFlagEmoji: "🇫🇷", awayScore: "0", win: "away", pentalties: true }, // Francia gana en penales
    { id: 3, homeFlag: "🇳🇱", homeScore: "2", awayFlagEmoji: "🇹🇷", awayScore: "1", win: "home" },
    { id: 4, homeFlag: "🏴\u200d🏴\u200d☠️", homeFlagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore: "1", awayFlagEmoji: "🇨🇭", awayScore: "1", win: "home" },
  ],
  semis: [
    { id: 5, homeFlagEmoji: "🇪🇸", homeScore: "2", awayFlagEmoji: "🇫🇷", awayScore: "1", win: "home" },
    { id: 6, homeFlagEmoji: "🇳🇱", homeScore: "1", awayFlagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayScore: "2", win: "away" },
  ],
  final: [
    { id: 7, homeFlagEmoji: "🇪🇸", homeScore: "2", awayFlagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayScore: "1", win: "home" },
  ]
};

export default function PlayoffBracket({ stages = DEFAULT_STAGES }) {
  
  // Mapeo manual para asegurar que los emojis se lean correctamente si vienen simplificados
  const MatchBoxMini = ({ match }) => {
    if (!match) return <div className="w-16 h-12 bg-zinc-100/40 dark:bg-zinc-800/20 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800 animate-pulse" />;
    
    // Fallbacks de banderas por si los nombres de propiedades cambian
    const homeFlag = match.homeFlagEmoji || match.homeFlag || "🏳️";
    const awayFlag = match.awayFlagEmoji || match.away || "🏳️";

    return (
      <div className="flex flex-col w-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm overflow-hidden text-[11px] font-medium">
        {/* Fila Local */}
        <div className={`flex items-center justify-between px-1.5 py-0.5 border-b border-zinc-100 dark:border-zinc-800/50 ${match.win === 'home' ? 'bg-zinc-50 dark:bg-zinc-800/30 text-zinc-900 dark:text-white font-bold' : 'text-zinc-400'}`}>
          <span className="text-sm leading-none">{homeFlag}</span>
          <span className="tabular-nums">{match.homeScore}</span>
        </div>
        
        {/* Fila Visitante */}
        <div className={`flex items-center justify-between px-1.5 py-0.5 ${match.win === 'away' ? 'bg-zinc-50 dark:bg-zinc-800/30 text-zinc-900 dark:text-white font-bold' : 'text-zinc-400'}`}>
          <span className="text-sm leading-none">{awayFlag}</span>
          <span className="tabular-nums">{match.awayScore}</span>
        </div>
      </div>
    );
  };

  // Obtener la bandera del campeón
  const getChampionFlag = () => {
    const finalMatch = stages.final?.[0];
    if (!finalMatch) return "👑";
    return finalMatch.win === 'home' 
      ? (finalMatch.homeFlagEmoji || finalMatch.homeFlag) 
      : (finalMatch.awayFlagEmoji || finalMatch.away);
  };

  return (
    <div className="flex m-auto w-full overflow-x-auto pb-4 scrollbar-none select-none mt-4 bg-secondary rounded-lg">
      {/* Estructura horizontal super compacta */}
      <div className="mt-4 flex items-center justify-start sm:justify-center gap-4 min-w-[420px] p-2 mx-auto">
        
        {/* 1. CUARTOS IZQUIERDA */}
        <div className="flex flex-col gap-4">
          <MatchBoxMini match={stages.cuartos?.[0]} />
          <MatchBoxMini match={stages.cuartos?.[1]} />
        </div>

        {/* 2. SEMI IZQUIERDA */}
        <div className="flex flex-col justify-center">
          <MatchBoxMini match={stages.semis?.[0]} />
        </div>

        {/* 3. CENTRO: GANADOR & FINAL */}
        <div className="flex flex-col items-center gap-2 px-1">
          {/* Badge del Campeón flotando arriba */}
          <div className="flex flex-col items-center bg-gradient-to-b from-amber-400/20 to-amber-500/5 border border-amber-500/20 px-2 py-1 rounded-md shadow-sm mb-1 animate-bounce duration-1000">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 leading-none mb-0.5">Ganador</span>
            <span className="text-lg leading-none">{getChampionFlag()}</span>
          </div>
          
          {/* Caja de la Final */}
          <MatchBoxMini match={stages.final?.[0]} />
        </div>

        {/* 4. SEMI DERECHA */}
        <div className="flex flex-col justify-center">
          <MatchBoxMini match={stages.semis?.[1]} />
        </div>

        {/* 5. CUARTOS DERECHA */}
        <div className="flex flex-col gap-4">
          <MatchBoxMini match={stages.cuartos?.[2]} />
          <MatchBoxMini match={stages.cuartos?.[3]} />
        </div>

      </div>
    </div>
  );
}