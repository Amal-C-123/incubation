import React from "react";
import AdminNav from "../../Components/AdminNav";
import ApplicationList from "../../Components/ApplicationList";
import SideNav from "../../Components/SideNav";

function AdminHome() {
  return (
    <>
      <div className="h-screen bg-slate-300 flex">
        <SideNav />
        <div className="w-full overflow-y-hidden">
          <AdminNav />
          <div className="h-screen bg-slate-100">
              <ApplicationList/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
