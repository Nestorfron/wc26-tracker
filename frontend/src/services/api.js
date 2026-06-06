const API_URL = import.meta.env.VITE_API_URL

export const fetchData = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error ${response.status}`
    );
  }

  const data = await response.json();

  return data;
};