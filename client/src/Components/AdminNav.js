import React from "react";
import { useNavigate } from "react-router-dom";

function AdminNav() {
  const navigate = useNavigate()
   const doLogout = ()=>{
    localStorage.removeItem('admin')
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
   }
  return (
    <>
      <div className=" shadow-md w-full top-0 left-0">
        <div className="md:flex flex bg-gray-500 items-center justify-between px-5 py-4 md:px-5 ">
          <div
            className=" font-bold text-2xl cursor-pointer flex items-center font-[poppins]
          text-white"
          >
            <h1 className="drop-shadow-lg text-transform: uppercase px-10">Admin</h1>
          </div>
          <div className="md:flex flex md:items-center ">
            <button className="text-indigo-200 bg-black px-2 py-1 rounded" onClick={doLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNav;
