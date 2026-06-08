export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center py-6">
        <div className="text-4xl animate-bounce">⚽</div>

        <p className="mt-2 text-sm text-zinc-500">Cargando datos...</p>
      </div>

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="
            h-28
            rounded-3xl
            border border-white/10
            bg-white/60 dark:bg-zinc-900/60
            backdrop-blur-xl
            p-4
            animate-pulse
            m-4
          "
        >
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />

            <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-700 rounded" />
          </div>

          <div className="mt-6 flex justify-between">
            <div className="h-8 w-28 bg-zinc-300 dark:bg-zinc-700 rounded-xl" />

            <div className="h-8 w-28 bg-zinc-300 dark:bg-zinc-700 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
