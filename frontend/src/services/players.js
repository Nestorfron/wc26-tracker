import { fetchData } from "./api";
export const getPlayers = async (teamId) => {
  try {
    return await fetchData(`/players/squads/${teamId}`);
  } catch (err) {
    console.error("Error fetching players:", err);
    return { players: [] };
  }
};

export const getPlayerById = (id) =>
  fetchData(`/players/${id}`);