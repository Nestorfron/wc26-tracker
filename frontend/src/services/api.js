const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchData = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  return await response.json();
};