import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function ProtectedRoute(props) {
  let navigate = useNavigate();

  if (localStorage.getItem("userToken") === null) {
    // navigate("/Login");
    return <Navigate to="/Login" />;
  } else {
    return props.children;
  }
}
