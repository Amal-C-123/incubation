import React from "react";
import AdminNav from "../../Components/AdminNav";
import SideNav from "../../Components/SideNav";
import SlotModal from "../../Components/SlotModal";
import Slots from "../../Components/Slots";

function BookSlots() {


  return (
    <>
      <div className="h-screen bg-stone-300 flex">
        <SideNav />
        <div className="w-full overflow-y-hidden">
          <AdminNav />
          <div className="h-screen ">
                <Slots/>
                <SlotModal/>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookSlots;
