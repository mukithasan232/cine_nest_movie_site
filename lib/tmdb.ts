const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "f5dbeb3d6df43910c844e67e3d2742de";
const BASE_URL = "https://api.themoviedb.org/3";


export async function fetchFromTMDB(endpoint: string, options: RequestInit = {}) {
  // Turn off local mock mode to view real response or api key missing.
  if (!API_KEY || API_KEY.includes("placeholder")) {
    console.warn(`TMDB API credentials missing for endpoint: ${endpoint}`);
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      next: { revalidate: 3600, ...options.next },
    });

    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`TMDB API error (${res.status}): ${res.statusText} for ${endpoint}`);
      }
      // Return a clean error object instead of the array fallback
      return { success: false, status_code: res.status };
    }

    return await res.json();
  } catch (error) {
    console.error(`TMDB Network Error:`, error);
    return { results: [] };
  }
}

export async function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/day");
}

export async function getMovieDetails(id: string) {
  let data = await fetchFromTMDB(`/movie/${id}?append_to_response=credits`);
  console.log("Movie endpoint response for", id, ":", data?.id ? "success" : data);
  
  // If the movie wasn't found (like for TV Show IDs), fallback to querying TV Show details
  if (!data || data.success === false) {
    console.log("Falling back to TV endpoint for", id);
    data = await fetchFromTMDB(`/tv/${id}?append_to_response=credits`);
    console.log("TV endpoint response setup:", data?.id ? "success" : data);
    
    if (!data || data.success === false) {
      console.log("TV endpoint also failed. Returning null.");
      return null;
    }
    
    // Normalize TV show data into movie schema to reuse the same MovieDetail page
    data.title = data.name;
    data.release_date = data.first_air_date;
  }

  if (data.results && data.results.length === 0 && !data.id) {
    console.log("Returned null due to empty results for", id);
    return null;
  }

  // Handle detailed movie view (not in general results list)
  if (data.results && data.results.length > 0) {
    const found = data.results.find((m: any) => m.id.toString() === id);
    if (found) {
       found.title = found.title || found.name;
       found.release_date = found.release_date || found.first_air_date;
    }
    return found || data.results[0];
  }
  
  const finalResult = data.id ? data : null;
  if (!finalResult) {
    console.log("Returning null at the end for ID", id);
  }
  return finalResult;
}

export async function getMovieCast(id: string) {
  let data = await fetchFromTMDB(`/movie/${id}/credits`);
  
  if (!data || data.success === false) {
    data = await fetchFromTMDB(`/tv/${id}/credits`);
  }
  
  return data;
}

export const getImageUrl = (path: string, size: string = "w500") => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
