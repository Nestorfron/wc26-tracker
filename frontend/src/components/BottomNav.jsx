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
        flex
        items-center
        gap-2

        p-2

        rounded-full

        border
        border-white/20

        bg-white/60
        dark:bg-zinc-950/60

        backdrop-blur-[40px]

        shadow-[0_10px_40px_rgba(0,0,0,0.18)]

        supports-[backdrop-filter]:bg-white/55
        dark:supports-[backdrop-filter]:bg-zinc-950/55
        "
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
