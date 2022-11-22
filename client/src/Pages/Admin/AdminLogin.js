import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLog from "../../Components/AdminLog";

function AdminLogin() {
  let token = localStorage.getItem("admin");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  });

  return (
    <>
      <div className="bg-slate-200 h-screen d-flex">
        <AdminLog />
      </div>
    </>
  );
}

export default AdminLogin;
