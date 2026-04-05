const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Mock data to ensure the UI looks premium even without an API Key
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlSaba7.jpg",
    backdrop_path: "/8pjWv2hZotIv6psebm9Y9YpCx6q.jpg",
    vote_average: 8.7,
    release_date: "2014-11-05",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster_path: "/8Gxv2mYnrpszbpiic3z9QpIBmCc.jpg",
    backdrop_path: "/fm610mBFrDSR39S6g9pk9M9hdiL.jpg",
    vote_average: 8.1,
    release_date: "2023-07-19",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
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
  {
    id: 4,
    title: "Blade Runner 2049",
    poster_path: "/gajva2L0rQ6EOqcfvYvMgNkzCub.jpg",
    backdrop_path: "/mVr0U7YtIdbZpYp9p968T36Y9S7.jpg",
    vote_average: 7.5,
    release_date: "2017-10-04",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDp9s1vmsTu4X3qPLPt.jpg",
    backdrop_path: "/nMK9SzwuYkueyYp77Y9SbeS889T.jpg",
    vote_average: 8.5,
    release_date: "2008-07-16",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
  },
];

export async function getMovies(endpoint: string) {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.warn(`TMDB API Key missing. Returning mock data for: ${endpoint}`);
    return { results: MOCK_MOVIES };
  }

  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      // Return mock data instead of throwing to prevent application crash
      console.error(`TMDB Error ${response.status}. Falling back to mock data.`);
      return { results: MOCK_MOVIES };
    }
    return await response.json();
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    return { results: MOCK_MOVIES };
  }
}

export async function getUpcomingMovies() {
  return getMovies("/movie/upcoming");
}

export async function getTrendingMovies() {
  return getMovies("/movie/popular"); // Use popular as trending fallback
}

export async function getMovieDetails(id: string) {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    const mock = MOCK_MOVIES.find(m => m.id.toString() === id) || MOCK_MOVIES[0];
    return { ...mock, credits: { cast: [] }, recommendations: { results: MOCK_MOVIES.filter(m => m.id.toString() !== id) } };
  }

  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,recommendations,reviews`;
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      const mock = MOCK_MOVIES[0];
       return { ...mock, credits: { cast: [] }, recommendations: { results: MOCK_MOVIES } };
    }
    return await response.json();
  } catch (error) {
    console.error("TMDB Detail Error:", error);
    return null;
  }
}

export const getImageUrl = (path: string, size: string = "w500") => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  if (path.startsWith("http")) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
