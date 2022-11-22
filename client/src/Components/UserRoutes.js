import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
  const token2 = localStorage.getItem("user");
  return token2 ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoutes;
