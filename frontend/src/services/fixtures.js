import { fetchData } from "./api";

export const getFixtures = () =>
  fetchData("/fixtures");

export const getTodayFixtures = () =>
  fetchData("/fixtures/today");

export const getFixtureById = (id) =>
  fetchData(`/fixtures/${id}`);

export const getLiveFixtures = () =>
  fetchData("/fixtures/live");