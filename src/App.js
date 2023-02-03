import React from "react";
// import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/Home/Home";
import Layout from "./component/Layout/Layout";
import Login from "./component/Login/Login";
import Movies from "./component/Movies/Movies";
import People from "./component/People/People";
import Signup from "./component/Signup/Signup";
import TVShow from "./component/TVShow/TVShow";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

import UserProfile from "./component/UserProfile/UserProfile";
import { Offline } from "react-detect-offline";

import jwtDecode from "jwt-decode";

import { useState } from "react";
import { useEffect } from "react";
import CardDetails from "./component/CardDetails/CardDetails";
export default function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      getUserData();
    }
  }, []);

  const [userData, setUserData] = useState(null);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
  }
  let routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout getUserData={getUserData} userData={userData} logOut={logOut} />
      ),
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "UserProfile",
          element: (
            <UserProfile getUserData={getUserData} userData={userData} />
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "CardDetails/:id/:media_type",
          element: (
            <ProtectedRoute userData={userData}>
              <CardDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login userData={userData} getUserData={getUserData} />,
        },
        {
          path: "TVShow",
          element: (
            <ProtectedRoute userData={userData}>
              <TVShow />
            </ProtectedRoute>
          ),
        },
        { index: true, element: <Signup /> },
      ],
    },
  ]);
  function getUserData() {
    let tokendata = localStorage.getItem("userToken");
    let deocded = jwtDecode(tokendata);
    // console.log(deocded);
    setUserData(deocded);
  }
  return (
    <div>
      <div>
        <Offline>
          <div className="offline shadow-lg p-4 mb-5 bg-warning text-dark rounded fw-bolder ">
            you are offline check your internet !
          </div>
        </Offline>
      </div>
      <div className="">
        <RouterProvider router={routes}></RouterProvider>
      </div>
    </div>
  );
}
