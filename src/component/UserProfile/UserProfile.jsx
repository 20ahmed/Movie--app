import React from "react";
import { Helmet } from "react-helmet";

export default function UserProfile({ getUserData, userData }) {
  console.log(userData);
  let { first_name, last_name, email, age } = userData;

  return (
    <>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {first_name}
            {"  "}
            {last_name}
          </title>
        </Helmet>
      </>
      <div className="container ">
        <div className="fw-bolder fw">
          <h1 className="py-3">
            <span>Hi </span>
            {first_name}
            {last_name}!
          </h1>
        </div>

        <h1 className="h4 py-3">email : {email}</h1>
        <h3>your age is {age}</h3>
        <h4>Have a nice day !</h4>
      </div>
    </>
  );
}
