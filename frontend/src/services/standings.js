import { fetchData } from "./api";

export const getStandings = () =>
  fetchData("/standings");