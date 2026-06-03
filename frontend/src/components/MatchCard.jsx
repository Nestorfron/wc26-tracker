export const flags = {
    Argentina: "ar",
    Australia: "au",
    Austria: "at",
    Belgium: "be",
    "Bosnia & Herzegovina": "ba",
    Brazil: "br",
    Canada: "ca",
    Chile: "cl",
    "Cote d'Ivoire": "ci",
    Colombia: "co",
    Croatia: "hr",
    Curaçao: "cw",
    "Czechia": "cz",
    Ecuador: "ec",
    Egypt: "eg",
    England: "gb-eng",
    France: "fr",
    Germany: "de",
    Ghana: "gh",
    "IR Iran": "ir",
    Iraq: "iq",
    Japan: "jp",
    Jordan: "jo",
    Mexico: "mx",
    Morocco: "ma",
    Netherlands: "nl",
    Norway: "no",
    "New Zealand": "nz",
    Panama: "pa",
    Paraguay: "py",
    Portugal: "pt",
    Scotland: "gb-sct",
    Senegal: "sn",
    "Saudi Arabia": "sa",
    "South Africa": "za",
    "Korea Republic": "kr",
    Spain: "es",
    Sweden: "se",
    Switzerland: "ch",
    Tunisia: "tn",
    Türkiye: "tr",
    Uruguay: "uy",
    "United States": "us",
    Qatar: "qa",
    Haiti: "ht",
    Uzbekistan: "uz",
    Algeria: "dz",
    "Cabo Verde": "cv",
    "DR Congo": "cd",
  };




export default function MatchCard({
  team1,
  team2,
  date,
  time,
  group,
  ground,
  round,
}) {
  const flag1 = flags[team1];
  const flag2 = flags[team2];


  

  return (
    <div
      className="
      bg-card
      rounded-lg
      p-5
      shadow-glass
      border
      border-white/10
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center w-24">
          <img
            src={`https://flagcdn.io/${flags[team1]}.svg`}
            alt={team1}
            className="w-12 h-12 rounded-lg"
          />

          <span
            className="
            text-sm
            font-medium
            text-center
            mt-2
            "
          >
            {team1}
          </span>
        </div>

        <div className="text-center flex-1">
          <p
            className="
            text-xs
            uppercase
            tracking-wider
            opacity-60
            "
          >
            {round}
          </p>

          <p
            className="
            text-xl
            font-bold
            my-2
            "
          >
            VS
          </p>

          <p className="text-sm opacity-70">
            {group}
          </p>
        </div>

        <div className="flex flex-col items-center w-24">
          <img
            src={`https://flagcdn.io/${flags[team2]}.svg`}
            alt={team2}
            className="w-12 h-12 rounded-lg"
          />

          <span
            className="
            text-sm
            font-medium
            text-center
            mt-2
            "
          >
            {team2}
          </span>
        </div>
      </div>

      <div
        className="
        mt-5
        pt-4
        border-t
        border-white/10
        text-center
        "
      >
        <p className="font-medium">
          {date}
        </p>

        <p className="text-sm opacity-70">
          {time}
        </p>

        <p
          className="
          text-sm
          mt-2
          opacity-60
          "
        >
          📍 {ground}
        </p>
      </div>
    </div>
  );
}