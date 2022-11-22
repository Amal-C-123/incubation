import React, { useContext, useEffect, useState } from "react";
import PendingTable from "./PendingTable";
import Table from "./Table";
import axios from "../Config/axiosBaseUrl";
import { ApplicationContext } from "../Store/AppContext";
import AppViewModal from "./AppViewModal";

function ApplicationList() {
  const { setApplications, modal } = useContext(ApplicationContext);
  const [change, setChange] = useState("");
  const [showModal, setShowModal] = useState(false);
  let token = localStorage.getItem("adminToken")

  useEffect(() => {
    axios.get("admin/applications", {
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      const { data } = res;
      setApplications(data);
      console.log("useEff here");
      setChange("");
    });
  }, [change, setApplications]);

  return (
    <>
      <Table
        setChange={setChange}
        change={change}
        setShowModal={setShowModal}
      />
      <PendingTable setChange={setChange}/>
      <AppViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        modal={modal}
      />
    </>
  );
}

export default ApplicationList;
