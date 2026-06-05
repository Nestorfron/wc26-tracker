const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;


const headers = {
  "x-apisports-key": API_KEY,
};

const BASE_URL = "https://v3.football.api-sports.io";

export async function getMatches() {
  const res = await fetch(
    `${BASE_URL}/fixtures`,
    { headers }
  );

  return res.json();
}

export async function getLiveMatches() {
  const res = await fetch(
    `${BASE_URL}/fixtures?live=all`,
    { headers }
  );

  return res.json();
}

export async function getStandings(league, season) {
  const res = await fetch(
    `${BASE_URL}/standings?league=${league}&season=${season}`,
    { headers }
  );

  return res.json();
}

export async function getTeams(league, season) {
  const res = await fetch(
    `${BASE_URL}/teams?league=${league}&season=${season}`,
    { headers }
  );

  return res.json();
}