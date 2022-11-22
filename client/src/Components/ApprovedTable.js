import React, { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../Store/AppContext';
import axios from '../Config/axiosBaseUrl';

function ApprovedTable() {
    let { applications, setApplications} = useContext(ApplicationContext);
    const [change, setChange] = useState("");
    let token = localStorage.getItem("adminToken")
    let rowData = applications?.filter(data => data.Status === 'approved')

    useEffect(() => {
        axios.get("admin/applications", {
          headers: { token: `Bearer ${token}` }
        }).then((res) => {
          const { data } = res;
          setApplications(data);
          console.log("useEff here");
          setChange("");
        });
      }, [change, setApplications]);

      const allocate = (rowData )=>{
        axios.post('admin/setSlot',rowData).then((res)=>{
          setChange('change it')
        })
      }


  return (
    <>
        <div className=' w-8/9 mx-auto '>
        <h1 className="px-8 py-7 text-2xl font-semibold text-center ">
          Approved Application List
        </h1>

        <div className="overflow-x-hidden relative mt-6">
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
                        className="bg-green-700 text-white px-2 py-1 rounded"
                        onClick={()=>{allocate(...rowData)}}
                      >
                        Allocate
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
  )
}

export default ApprovedTable