import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function MediaItem({ item }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <div className="col-md-2">
        <Link
          className="nav-link"
          to={`/CardDetails/${item.id}/${item.media_type}`}
        >
          <div className="movie">
            <img
              src={
                item.media_type === "person"
                  ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                  : `https://image.tmdb.org/t/p/w500/${item.poster_path}`
              }
              alt=""
              className="img-fluid "
            />

            {item.media_type === "person" ? (
              ""
            ) : (
              <span className="image-rating bg-info fw-bolder">
                {item.vote_average?.toFixed(1)}
              </span>
            )}

            <h3 className=" bg-danger fw-bolder p-1 h6">
              {item.title} {item.name}
            </h3>
            {/*    <p className="fw-lighter"> {item.overview}</p>*/}
          </div>
        </Link>
      </div>
    </>
  );
}
