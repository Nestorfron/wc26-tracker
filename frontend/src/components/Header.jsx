import ThemeToggle from "./ThemeToggle";

export default function Header({
  title,
  subtitle,
}) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>
      </div>

      <ThemeToggle />
    </div>
  );
}