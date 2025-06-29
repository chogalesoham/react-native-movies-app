export const TMDB_CONFIG = {
  Base_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_API_KEY || "your_api_key_here",
  Headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY || "your_api_key_here"}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=1`
    : "/discover/movie?sort_by=popularity.desc&page=1";

  const response = await fetch(`${TMDB_CONFIG.Base_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  if (Array.isArray(data.results)) {
    return data.results.slice(0, 50);
  }
  return [];
};

export const TrendingMovies = async () => {
  const endpoint = "/trending/movie/day?page=1";
  const response = await fetch(`${TMDB_CONFIG.Base_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  const data = await response.json();
  if (Array.isArray(data.results)) {
    const shuffled = data.results.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  }
  return [];
};
