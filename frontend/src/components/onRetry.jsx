import { RefreshCw, WifiOff } from "lucide-react";


export default function ErrorState({ onRetry }) {
  return (
    <div className="h-screen">
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="rounded-full bg-red-500/10 p-4 mb-4">
        <WifiOff className="w-10 h-10 text-red-500" />
      </div>

      <h2 className="text-xl font-bold">
        Error al cargar los datos
      </h2>

      <p className="mt-2 text-sm text-zinc-500 max-w-md">
        No fue posible obtener la información. Verifica tu conexión e intenta nuevamente.
      </p>

      <button
        onClick={onRetry}
        className="
          mt-6
          flex items-center gap-2
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          transition-all
          shadow-lg
        "
      >
        <RefreshCw className="w-4 h-4" />
        Reintentar
      </button>
    </div>
    </div>
    
  );
}