import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function CardDetails() {
  let { id, media_type } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  async function getDetailsData(id, media_type) {
    let { data } = await axios.get(
      ` https://api.themoviedb.org/3/${media_type}/${id}?api_key=ba3340e2faf7b20b543e6bc00684b61f&language=en-US`
    );
    setItemDetails(data);
  }
  console.log(id);
  console.log(itemDetails);

  useEffect(() => {
    getDetailsData(id, media_type);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{itemDetails.title || itemDetails.name}</title>
      </Helmet>
      <div className="d-flex">
        <div className="col-md-4 p-1">
          <div className="movie">
            {itemDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${itemDetails.poster_path}`}
                alt=""
                className="img-thumbnail  "
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500/${itemDetails.profile_path}`}
                alt=""
                className="img-thumbnail "
              />
            )}

            {itemDetails.media_type === "person" ? (
              ""
            ) : (
              <span className="image-rating bg-info fw-bolder">
                {itemDetails.vote_average?.toFixed(1)}
              </span>
            )}
            <h3 className=" bg-danger rounded-2  fw-bolder p-2 mt-2 h6">
              {itemDetails.title} {itemDetails.name}
            </h3>
            {/*    <p className="fw-lighter"> {itemDetails.overview}</p>*/}
          </div>
        </div>
        <div className="col-md-8 p-3 ">
          <h1 className="bg-danger w-50 rounded-3">
            {itemDetails.title}
            {itemDetails.name}
          </h1>
          <p className="py-3">
            {itemDetails.biography
              ? `biography : ${
                  itemDetails.biography.length > 400 || undefined
                    ? itemDetails.biography.slice(
                        0,
                        itemDetails.biography.length - 500
                      )
                    : "there is no biography"
                } `
              : `${
                  itemDetails.overview
                    ? itemDetails.overview
                    : " there is no overview"
                } `}
          </p>

          <h2 className="py-3 h4">
            {itemDetails.release_date
              ? `release_date : ${itemDetails.release_date}`
              : `place_of_birth :${itemDetails.place_of_birth} `}
          </h2>
          <span className="py-3">
            {itemDetails.vote_average
              ? `rate : ${itemDetails.vote_average?.toFixed(1)}`
              : ` birthday: ${itemDetails.birthday}`}
          </span>
        </div>
      </div>
    </>
  );
}
