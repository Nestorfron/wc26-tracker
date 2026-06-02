import { fetchData } from "./api";

export const getPlayers = () =>
  fetchData("/players");

export const getPlayerById = (id) =>
  fetchData(`/players/${id}`);