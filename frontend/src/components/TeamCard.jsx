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
          group
          relative
          overflow-hidden
          rounded-3xl
          p-5
          bg-card
          border border-white/10
          shadow-glass
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        {/* Glow decorativo */}
        <div
          className="
            absolute
            -top-10
            -right-10
            w-24
            h-24
            rounded-full
            bg-accent/10
            blur-3xl
            opacity-0
            group-hover:opacity-100
            transition-opacity
          "
        />
  
        <div className="flex flex-col items-center relative z-10">
          {/* Bandera */}
          <div
            className="
              w-28
              h-20
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-md
              ring-1
              ring-black/5
              dark:ring-white/10
            "
          >
            <img
              src={`https://flagcdn.io/${flags[team.name]}.svg`}
              alt={team.name}
              className="
                w-full
                h-full
                object-cover
              "
            />
          </div>
  
          {/* Nombre */}
          <h3
            className="
              mt-4
              text-base
              md:text-lg
              font-bold
              text-center
              leading-tight
              text-text
            "
          >
            {team.name}
          </h3>
  
          {/* Código FIFA */}
          {team.code && (
            <div
              className="
                mt-3
                px-3
                py-1
                rounded-full
                bg-accent/10
                text-accent
                text-xs
                font-semibold
                tracking-wider
                uppercase
              "
            >
              {team.code}
            </div>
          )}
        </div>
      </div>
    );
  }