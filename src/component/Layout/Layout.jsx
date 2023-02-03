import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout({ getUserData, userData, logOut }) {
  return (
    <div>
      <Navbar getUserData={getUserData} userData={userData} logOut={logOut} />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
