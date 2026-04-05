const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function check() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  console.log("API KEY:", apiKey);
  
  const res = await fetch(`https://api.themoviedb.org/3/movie/157336?api_key=${apiKey}`);
  const data = await res.json();
  console.log("Response:", data.title ? data.title : data);
}

check();
