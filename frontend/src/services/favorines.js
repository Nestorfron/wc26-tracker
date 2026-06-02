import { fetchData } from "./api";

export const getStadiums = () =>
  fetchData("/stadiums");

export const getStadiumById = (id) =>
  fetchData(`/stadiums/${id}`);