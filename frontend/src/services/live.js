import { fetchData } from "./api";

export const getLiveMatches = () =>
  fetchData("/live");