import React from "react";
import { useNavigate } from "react-router-dom";
import hero from '../../src/images/logoAdmininc.JPG'

function SideNav() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" md:col-start-1 md:col-end-3 md:block h-screen  bg-black w-60 flex">
        <div className=" text-white">
          <div className="border-b-2 mb-20 h-16 grid  justify-items-center place-items-center pt-2">
            <img src={hero} alt="" />
          </div>
        
          <div onClick={()=>navigate('/admin')} className="cursor-pointer mb-4 border-white hover:bg-slate-800 h-12 grid  justify-items-center place-items-center">
            <button >Applicant List</button> 
          </div>
          <div onClick={()=>navigate('/admin/approved')} className="cursor-pointer mb-4 border-white hover:bg-slate-800 h-12 grid  justify-items-center place-items-center">
            <button >Record Track</button> 
          </div>

          <div onClick={()=>navigate('/admin/slot-book')} className="cursor-pointer mb-4 border-white hover:bg-slate-800 h-12 grid  justify-items-center place-items-center">
            <button >Booking Slots</button> 
          </div>
      </div>
      </div>
    </>
  );
}

export default SideNav;
