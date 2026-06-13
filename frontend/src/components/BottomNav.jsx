import { NavLink } from "react-router-dom";
import { House, CalendarDays, Trophy, Flag } from "lucide-react";

export default function BottomNav() {
  const fixtureBadge = 1;

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
      badge: fixtureBadge,
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
    <div
      className="
      fixed
      bottom-4
      left-0
      right-0
      z-50
      flex
      justify-center
      px-4
      "
    >
      <nav
        className="
         flex items-center justify-between
          px-4 py-3
          rounded-3xl
          border border-white/10
          bg-white/20 dark:bg-zinc-900/20
          backdrop-blur-2xl
          shadow-lg
          shadow-black/5"
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <div
                  className={`
                  relative

                  flex
                  items-center

                  h-12

                  rounded-full

                  overflow-hidden

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                      px-4
                      gap-2

                      bg-white/70
                      dark:bg-white/10

                      text-[#007AFF]
                      dark:text-[#0A84FF]

                      shadow-inner
                      `
                      : `
                      w-12
                      justify-center

                      text-zinc-500
                      hover:text-zinc-700
                      dark:hover:text-zinc-300
                      `
                  }
                  `}
                >
                  <div className="relative">
                    <Icon size={22} strokeWidth={isActive ? 2.6 : 2} />
                  </div>

                  <span
                    className={`
                    whitespace-nowrap
                    text-sm
                    font-medium

                    transition-all
                    duration-300

                    ${isActive ? "opacity-100 w-auto" : "opacity-0 w-0"}
                    `}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
