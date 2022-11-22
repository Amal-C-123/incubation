import React, { useContext, useEffect } from "react";
import Button from "../../Components/Button";
import { AuthContext } from "../../Store/context";
import UserNav from "../../Components/UserNav";
import { Link } from "react-router-dom";
import hero from '../../images/bookSlots.JPG'

function UserHome() {
  const { user, setUser } = useContext(AuthContext);
  let localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user === null && localUser !== null) {
      setUser(localUser);
      console.log("iam working");
    }
  });

  return (
    <>
      <UserNav />
      <div className="bg-slate-200 flex items-center w-full h-screen">
        <div className="mx-auto">
          {user ? (
            <div className=" flex justify-between items-center">
              <div>
                <h1 className="animate-pulse text-2xl text-zinc-600 font-bold">
                  Book your slots Now!!
                </h1>

                <div className="mt-3">
                  <Link to="/application">
                    <Button>Apply</Button>
                  </Link>
                </div>
              </div>

              <img
                className="ml-20 w-80 rounded-xl"
                src={hero}
                alt=""
              />
            </div>
          ) : (
            <h1 className="px-10 py-2 rounded-md	 bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl animate-pulse font-normal leading-normal mt-0 mb-2 text-white">
              Welcome 
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default UserHome;
