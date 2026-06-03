import ThemeToggle from "./ThemeToggle";
import Logo from "../assets/logo.png";

export default function Header({ title }) {
  return (
    <div className="flex justify-between items-start mb-6">
       <img src={Logo} alt="WC26 Tracker" className="w-48 h-auto m-auto" />
    </div>
  );
}
