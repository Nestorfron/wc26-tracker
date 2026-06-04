import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
  onClick={toggleTheme}
  className="
    flex items-center justify-center
    w-10 h-10
    rounded-full
    border border-white/10
    bg-white/50 dark:bg-zinc-800/50
    backdrop-blur-md
    transition-all duration-300
    hover:scale-105
    hover:bg-white/80
    dark:hover:bg-zinc-700
  "
>
  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
</button>
  );
}
