import { fetchData } from "./api";

export const getTeams = () =>
  fetchData("/teams");

export const getTeamById = (id) =>
  fetchData(`/teams/${id}`);