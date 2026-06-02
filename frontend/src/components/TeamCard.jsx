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
    "Congo DR": "cd",
  };




export default function TeamCard({ team }) {
 
 
    return (
      <div
      className="
      bg-card
      rounded-3xl
      p-5
      shadow-glass
      border
      border-white/10
      hover:scale-[1.02]
      transition-all
      duration-200
      "
    >
      <div className="flex flex-col items-center">
        <div
          className="
          w-20
          h-20
          rounded-full
          overflow-hidden
          border-4
          border-accent/20
          bg-white
          flex
          items-center
          justify-center
          "
        >
          <img
            src={`https://flagcdn.io/${flags[team.name]}.svg`}
            alt={team.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="
          mt-4
          text-lg
          font-bold
          text-text
          text-center
          "
        >
          {team.name}
        </h3>

        {team.code && (
          <p
            className="
            mt-3
            text-xs
            uppercase
            tracking-wider
            text-zinc-500
            "
          >
            {team.code}
          </p>
        )}
      </div>
    </div>
  );
}
