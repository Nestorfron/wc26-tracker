import { fetchData } from "./api";

export const getMatches = () =>
  fetchData("/matches");

export const getTodayMatches = () =>
  fetchData("/matches/today");

export const getUpcomingMatches = () =>
  fetchData("/matches/upcoming");

export const getMatchById = (id) =>
  fetchData(`/matches/${id}`);