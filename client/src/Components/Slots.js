import axios from "../Config/axiosBaseUrl";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Store/SlotModalContext";

function Slots() {
  const [slots, setSlots] = useState([]);
  let token = localStorage.getItem("adminToken");
  const {
    setSlotModal,
    setSlotBook,
    setShowModal,
    approvedCompanies,
    setChoosedSlotNo,
    choosedSlotNo,
  } = useContext(ModalContext);
  const bookedSlotData = (companyId) => {
    axios.post("admin/booked-data", { companyId }).then((res) => {
      const { data } = res;
      setSlotModal(data);
      setShowModal(true);
      setSlotBook(false);
    });
  };

  const handleSlotBook = (dummyName) => {
    setChoosedSlotNo(dummyName);
    setSlotBook(true);
    setShowModal(true);
  };
  useEffect(() => {
    axios.get("admin/get-slots",{
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      const { data } = res;
      setSlots(data);
    });

    axios.get("admin/approved-companies",{
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      const { data } = res;
      approvedCompanies(data);
    });
    console.log("useEff here");
  }, [choosedSlotNo, approvedCompanies]);

  return (
    <>
      <div className="grid grid-cols-8 mt-10 gap-3 p-3  ml-3 mr-5">
        {slots?.map((row) =>
          row.companyId ? (
            <div
              key={row._id}
              onClick={() => bookedSlotData(row.companyId)}
              className="bg-gray-900 rounded shadow-inner text-white hover:bg-slate-300 hover:rounded-xl hover:text-black  min-w-fit min-h-fit sm:h-11 md:h-14 lg:h-16 xl:h-20  drop-shadow-lg grid cursor-pointer"
            >
              <p className="place-self-center">{row.name}</p>
            </div>
          ) : (
            <div
              key={row._id}
              onClick={() => handleSlotBook(row.name)}
              className="bg-gray-500 hover:text-black text-white hover:bg-slate-300 hover:rounded-xl rounded shadow-inner min-w-fit min-h-fit sm:h-11 md:h-14 lg:h-16 xl:h-20  drop-shadow-lg grid cursor-pointer"
            >
              <p className="place-self-center drop-shadow-md">{row.name}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Slots;
