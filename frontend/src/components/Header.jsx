import ThemeToggle from "./ThemeToggle";
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="sticky top-3 z-50  mb-6">
      <div
        className="
          flex items-center justify-between
          px-4 py-3
          rounded-3xl
          border border-white/10
          bg-white/70 dark:bg-zinc-900/70
          backdrop-blur-2xl
          shadow-lg
          shadow-black/5
        "
      >
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="WC26 Tracker"
            className="w-11 h-11 object-contain"
          />

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
              WC26 Tracker
            </h1>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              FIFA World Cup 2026
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}