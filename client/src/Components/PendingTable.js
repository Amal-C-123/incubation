import React, { useContext } from "react";
import { ApplicationContext } from "../Store/AppContext";
import axios from "../Config/axiosBaseUrl";

function PendingTable({ setChange }) {
  const { applications } = useContext(ApplicationContext);
  let rowData = applications?.filter(
    (data) => data.View && data.Status === "pending"
  );

  const setApproval = (id) => {
    axios.post("admin/set-approve", { id }).then((res) => {
      setChange('change it')
    });
  };

  const setDecline = (id) => {
    axios.post("admin/set-decline", { id }).then((res) => {
      setChange('change it')
    });
  };

  return (
    <>
      <div className="mt-10">
        <h1 className="px-8 py-7 text-2xl font-semibold text-start ml-20">
          Pending Applicant List
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
                <th scope="col" className="py-3 px-12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData?.map((row, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={row._id}
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{row.companyName}</td>
                  <td className="py-4 px-6">{row.streetAddress}</td>
                  <td className="py-4 px-6">
                    <span
                      onClick={() => {
                        setApproval(row._id);
                      }}
                      className="mr-3 cursor-pointer bg-green-400 text-black font-bold px-2 py-1 rounded"
                    >
                      Approve
                    </span>
                    <span
                      onClick={() => {
                        setDecline(row._id);
                      }}
                      className="bg-red-400 cursor-pointer text-black font-bold px-2 py-1 rounded"
                    >
                      Decline
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PendingTable;
