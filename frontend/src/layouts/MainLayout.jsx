import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
  return (
    <div
      className="
      min-h-screen
      bg-light-bg
      text-light-text

      dark:bg-dark-bg
      dark:text-dark-text

      transition-colors
      duration-300
      pb-20
      "
    >
      <Outlet />
      <BottomNav />
    </div>
  );
}