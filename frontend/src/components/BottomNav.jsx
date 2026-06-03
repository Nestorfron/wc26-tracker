import { NavLink } from "react-router-dom";
import {
  House,
  CalendarDays,
  Trophy,
  Flag,
  Settings,
} from "lucide-react";

export default function BottomNav() {
  const navItems = [
    {
      label: "Inicio",
      icon: House,
      path: "/",
    },
    {
      label: "Fixture",
      icon: CalendarDays,
      path: "/fixtures",
    },
    {
      label: "Grupos",
      icon: Trophy,
      path: "/standings",
    },
    {
      label: "Equipos",
      icon: Flag,
      path: "/teams",
    }, 
  ];

  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-50

      bg-card
      border-t
      border-zinc-300
      dark:border-zinc-700

      backdrop-blur-md
      "
    >
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                flex-col
                items-center
                py-3
                text-xs
                transition-all

                ${
                  isActive
                    ? "text-accent"
                    : "text-zinc-500"
                }
                `
              }
            >
              <Icon size={20} />

              <span className="mt-1">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}