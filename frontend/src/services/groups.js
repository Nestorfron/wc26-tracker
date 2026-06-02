import { fetchData } from "./api";

export const getGroups = () =>
  fetchData("/groups");

export const getGroup = (group) =>
  fetchData(`/groups/${group}`);