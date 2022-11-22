import React, { useContext } from "react";
import axios from '../Config/axiosBaseUrl'
import { ModalContext } from "../Store/SlotModalContext";

function SlotModal() {
  const { showModal, setShowModal, modal, slotBook, companies, choosedSlotNo, setChoosedSlotNo } =
    useContext(ModalContext);

    const handleModal =(e)=>{
        axios.post('admin/set-slot', {slotNo: choosedSlotNo,companyId: e.target.value}).then(()=>{
          setChoosedSlotNo('not now')
          setShowModal(false)
        })
    }

  return (
    <>
      {!slotBook && showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start  justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl pl-14 mx-auto font-semibold">
                    Applicant Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 w-full  h-30 mx-auto">
                    <div className="flex justify-between ">
                      <h1 className="text-lg ">Company Name :</h1>
                      <p className="text-slate-500 text-md">
                        {modal.companyName}
                      </p>
                    </div>

                    <div className="flex justify-between ">
                      <h1 className="text-lg ">Email :</h1>
                      <p className="text-slate-500 text-md">{modal.email}</p>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="text-lg ">User:</h1>
                      <p className="text-slate-500 text-md">
                        {modal.fname} {modal.lname}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="text-lg ">Address :</h1>
                      <p className="text-slate-500 text-md">
                        {modal.streetAddress}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="text-lg ">City :</h1>
                      <p className="text-slate-500 text-md">{modal.city}</p>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="text-lg ">State :</h1>
                      <p className="text-slate-500 text-md">{modal.state}</p>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="text-lg ">Pin :</h1>
                      <p className="text-slate-500 text-md">{modal.pin}</p>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="text-lg ">Incubation Type :</h1>
                      <p className="text-slate-500 text-md">
                        {modal.incubationType}
                      </p>
                    </div>
                  </div>
                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white hover:bg-red-500 bg-red-700 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {slotBook && showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start  justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl pl-14 mx-auto font-semibold">
                    Approved Companies
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 w-full  h-30 mx-auto">
                    <div className="flex justify-center">
                      <div className="mb-3 xl:w-96">
                        <select 
                          className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          onChange={handleModal}
                        >
                          <option defaultValue>
                            Select Approved Companies
                          </option>
                          {companies?.map((data) => (
                            <option key={data._id} value={data._id}>{data?.companyName}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white hover:bg-red-500 bg-red-700 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default SlotModal;
