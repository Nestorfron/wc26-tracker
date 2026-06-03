import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex ms-auto m-2 p-2 rounded-xl bg-light-card dark:bg-dark-card hover:scale-105 transition"
    >
      {theme === "dark" ? <Sun size={28} /> : <Moon size={28} />}
    </button>
  );
}
