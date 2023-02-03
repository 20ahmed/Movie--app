import React from "react";
import { Helmet } from "react-helmet";
import useRoute from "../Hooks/useRoute";
import MediaItem from "../MediaItem/MediaItem";
export default function People() {
  let { trendingMovies } = useRoute(
    "https://api.themoviedb.org/3/trending/person/week?api_key=ba3340e2faf7b20b543e6bc00684b61f"
  );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>People</title>
      </Helmet>
      <div className="row p-5">
        <div className="  d-flex  align-items-center col-md-4 ">
          <div className=" line mb-3 ">
            <h2 className="h4">
              trending <br /> People <br /> to watch now
            </h2>
            <p className="text-muted">most watched movies by days</p>
          </div>
        </div>

        {trendingMovies
          .filter((item) => item.profile_path !== null)
          .map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
      </div>
    </>
  );
}
