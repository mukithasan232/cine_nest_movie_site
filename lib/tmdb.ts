const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Premium Mock Data for Fail-safe operation
const MOCK_DATA = [
  {
    id: 1,
    title: "Oppenheimer",
    poster_path: "/8Gxv2mYnrpszbpiic3z9QpIBmCc.jpg",
    backdrop_path: "/fm610mBFrDSR39S6g9pk9M9hdiL.jpg",
    vote_average: 8.1,
    release_date: "2023-07-19",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
  },
  {
    id: 2,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlSaba7.jpg",
    backdrop_path: "/8pjWv2hZotIv6psebm9Y9YpCx6q.jpg",
    vote_average: 8.7,
    release_date: "2014-11-05",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
  },
  {
    id: 3,
    title: "Dune: Part Two",
    poster_path: "/czembS0RhiERbtNR7nUvN1M8zJ9.jpg",
    backdrop_path: "/xOMo8NETsO2igUqR90s6vCfvBmr.jpg",
    vote_average: 8.3,
    release_date: "2024-02-27",
    overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
  },
];

export async function fetchFromTMDB(endpoint: string, options: RequestInit = {}) {
  // If API Key is missing or default, use high-fidelity fallback data
  if (!API_KEY || API_KEY.includes("placeholder")) {
    console.warn(`TMDB API credentials missing. Running in Cinematic Mock Mode for: ${endpoint}`);
    return { results: MOCK_DATA };
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      next: { revalidate: 3600, ...options.next },
    });

    if (!res.ok) {
      console.error(`TMDB API unreachable (${res.status}). Falling back to mock data.`);
      return { results: MOCK_DATA };
    }

    return await res.json();
  } catch (error) {
    console.error(`TMDB Network Error. Falling back to mock data.`);
    return { results: MOCK_DATA };
  }
}

export async function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/day");
}

export async function getMovieDetails(id: string) {
  const data = await fetchFromTMDB(`/movie/${id}?append_to_response=credits`);
  
  // Handle detailed movie view (not in general results list)
  if (data.results && data.results.length > 0) {
    const found = data.results.find((m: any) => m.id.toString() === id);
    return found || data.results[0];
  }
  
  return data;
}

export async function getMovieCast(id: string) {
  const data = await fetchFromTMDB(`/movie/${id}/credits`);
  return data;
}

export const getImageUrl = (path: string, size: string = "w500") => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
