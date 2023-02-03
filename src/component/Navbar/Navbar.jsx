import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  return (
    <div>
      {/*  Navbar*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-info p-4 ">
        <div className="container-fluid justify-content-between">
          {/*  Left elements */}
          <div className="d-flex">
            {/*  Brand */}
            {/*  <a
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              href="#"
            ></a>
*/}
            {/*  Search form */}
            {userData ? (
              <ul className=" navbar-nav  w-auto my-auto   d-flex">
                <ul className="border-0 link-ul  d-flex list-unstyled">
                  <li className="mx-2 link-ul">
                    <Link to="home">Home</Link>
                  </li>
                  <li className="mx-2 link-ul">
                    <Link to="movies">Movies</Link>
                  </li>
                  <li className="mx-2 link-ul">
                    <Link to="TVShow">Tv Show</Link>
                  </li>
                  <li className="mx-2 link-ul">
                    <Link to="people">People</Link>
                  </li>
                  {/*  <li className="mx-2 link-ul">
                    <Link to="">About</Link>
                  </li>
                  <li className="mx-2 link-ul">
                    <Link to="">Network</Link>
                  </li> */}
                </ul>
              </ul>
            ) : (
              ""
            )}
          </div>
          {/*  Left elements */}

          {/*  Center elements */}
          <ul className="text-center m-auto navbar-nav flex-row d-none d-lg-flex wrapper ">
            <div className="icon p-1 rounded-4 facebook d-flex me-3">
              <link className=" curs fs-5 text-reset fab fa-facebook-f"></link>
            </div>
            <div className="icon p-1 rounded-4 twitter d-flex me-3">
              <link className=" curs fs-5 text-reset fab fa-twitter"></link>
            </div>
            <div className="icon p-1 rounded-4 google d-flex me-3">
              <link className=" curs fs-5 text-reset fab fa-google"></link>
            </div>
            <div className="icon p-1 rounded-4 instagram d-flex me-3">
              <link className=" curs fs-5 text-reset fab fa-instagram"></link>
            </div>
            <div className="icon p-1 rounded-4 linkedin d-flex me-3">
              <link className=" curs fs-5 text-reset fab fa-linkedin"></link>
            </div>

            <div className="icon p-1 rounded-4 github d-flex">
              <link className=" curs   fs-5 text-reset fab fa-github"></link>
            </div>
          </ul>
          {/*  Center elements */}

          {/*  Right elements */}
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3 me-md-1">
              <a className="nav-link d-sm-flex align-items-sm-center">
                <strong className="d-none d-sm-block ms-1">
                  <Link to="UserProfile">
                    {userData ? `Hi ${userData.first_name} ! ` : ""}
                  </Link>
                </strong>
              </a>
            </li>
            {!userData ? (
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-3 me-md-1">
                  <Link className="nav-link fw-bolder" to="login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item me-3 me-md-1">
                  <Link className="nav-link fw-bolder" to="">
                    sign Up
                  </Link>
                </li>
              </ul>
            ) : (
              <li className="nav-item me-3 me-md-1">
                <Link
                  onClick={logOut}
                  className="nav-link fw-bolder"
                  to="login"
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
          {/*  Right elements */}
        </div>
      </nav>
      {/*  Navbar */}
    </div>
  );
}
