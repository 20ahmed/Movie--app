import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import MediaItem from "../MediaItem/MediaItem";
import CardDetails from "../CardDetails/CardDetails";
import { Helmet } from "react-helmet";

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

export default function Home() {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);
  let [trendingTv, setTrendingTv] = useState([]);

  async function getData(mediatype, callback) {
    let { data } = await Axios.get(
      `https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=ba3340e2faf7b20b543e6bc00684b61f`
    );
    // console.log(data.results);
    // console.log(trendingPeople);
    callback(data.results);
  }

  useEffect(() => {
    getData("movie", setTrendingMovies);
    getData("person", setTrendingPeople);
    getData("tv", setTrendingTv);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      {/* -----------------------  Movies Section ------------------*/}
      <div className="row p-5">
        <div className="  d-flex  align-items-center col-md-4 ">
          <div className=" line mb-3 ">
            <h2 className="h4">
              trending <br /> movies <br /> to watch now
            </h2>
            <p className="text-muted">most watched movies by days</p>
          </div>
        </div>

        {trendingMovies
          .map((item, index) => <MediaItem key={index} item={item} />)
          .splice(0, 10)}
      </div>
      {/* -----------------------  Movies Section ------------------//*/}

      {/* -----------------------  TV Section ------------------*/}
      <div className="row p-5">
        <div className="  d-flex  align-items-center col-md-4 ">
          <div className=" line mb-3 ">
            <h2 className="h4">
              trending <br /> TV <br /> to watch now
            </h2>
            <p className="text-muted">most watched TV by days</p>
          </div>
        </div>

        {trendingTv
          .map((item, index) => <MediaItem key={index} item={item} />)
          .splice(0, 10)}
      </div>

      {/* -----------------------  TV Section ------------------//*/}

      {/* -----------------------  People Section ------------------*/}
      <div className="row p-5">
        <div className="  d-flex  align-items-center col-md-4 ">
          <div className=" line mb-3 ">
            <h2 className="h4">
              trending <br /> TV <br /> to watch now
            </h2>
            <p className="text-muted">most watched TV by days</p>
          </div>
        </div>

        {trendingPeople
          .filter((item) => item.profile_path !== null)
          .map((item, index) => <MediaItem key={index} item={item} />)
          .splice(0, 10)}
      </div>
      {/* -----------------------  People Section ------------------//*/}
    </>
  );
}
