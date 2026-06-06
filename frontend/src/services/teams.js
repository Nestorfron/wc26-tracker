import { fetchData } from "./api";

export const getTeams = () =>
  fetchData("/teams");