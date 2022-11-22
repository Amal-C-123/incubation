import React, { useContext } from "react";
import { ApplicationContext } from "../Store/AppContext";
import axios from "../Config/axiosBaseUrl";

function Table({ setChange, setShowModal }) {
  let { applications, setAppModal } = useContext(ApplicationContext);

  const handleOpen = (id) => {
    let data = applications.filter((elem) => elem._id === id);
    setAppModal(...data);
    setOpenStatus(id);
  };

  let rowData = applications?.filter(data => !data.View)

  const setOpenStatus = (id) => {
    axios.post("admin/change-view", { id }).then((res) => {
      setChange("change it");
      setShowModal(true);
    });
  };

  return (
    <>
      <div>
        <h1 className="px-8 py-7 text-2xl font-semibold text-start ml-20">
          New Applicant List
        </h1>

        <div className="overflow-x-hidden relative">
          <table className="w-4/5 mx-auto text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  S.no
                </th>
                <th scope="col" className="py-3 px-6">
                  Company Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Company Details
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData?.map((row, index) =>
                 (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={row._id}
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{row.companyName}</td>
                    <td className="py-4 px-6">{row.streetAddress}</td>
                    <td className="py-4 px-6">
                      <button
                        className="bg-black text-white px-2 py-1 rounded"
                        onClick={() => handleOpen(row._id)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
