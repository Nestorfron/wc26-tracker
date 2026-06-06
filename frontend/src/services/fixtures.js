import { fetchData } from "./api";

export const getFixtures = async () => {
  const data = await fetchData("/fixtures");

  return data;
};