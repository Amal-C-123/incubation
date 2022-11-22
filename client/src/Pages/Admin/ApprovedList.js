import React from "react";
import AdminNav from "../../Components/AdminNav";
import ApprovedTable from "../../Components/ApprovedTable";
import SideNav from "../../Components/SideNav";

function ApprovedList() {
  return (
    <>
      <div className="h-screen bg-slate-300 flex">
        <SideNav />
        <div className="w-full overflow-y-hidden">
          <AdminNav />
          <div className="h-screen bg-slate-100">
                <ApprovedTable/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApprovedList;
