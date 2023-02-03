import axios from "axios";
import { useEffect, useState } from "react";

export default function useRoute(url) {
  let [trendingMovies, setTrendingMovies] = useState([]);

  async function getData() {
    let { data } = await axios.get(url);
    setTrendingMovies(data.results);
  }

  useEffect(() => {
    getData();
  }, []);
  return { trendingMovies };
}
