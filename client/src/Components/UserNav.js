import React, { useContext, useEffect } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Store/context";


function UserNav() {
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    let localUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      if (user === null && localUser !== null) {
        setUser(localUser);
        console.log("iam working");
      }
    });

    const doLogout= ()=>{
       setUser(null)
       localStorage.removeItem('user')
       localStorage.removeItem('token')
        navigate('/')
    }
  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex bg-white items-center justify-between  py-4 md:px-10  px-7">
          <div onClick={()=>navigate('/')}
            className="font-bold text-2xl cursor-pointer flex items-center font-[poppins]
          tex-gray-800"
          >
            <span className="text-3xl text-indigo-600 ml-2 mr-1 pt-2">
              <ion-icon name="navigate-circle-outline"></ion-icon>
            </span>
            Reva Nest
          </div>
          <div className="md:flex md:items-center ">
            { user ? ( <> <h3>Welcome <br/> {user.name}</h3> 
               <button onClick={doLogout} className="bg-red-600 text-white font-[poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400
               duration-500">Logout</button>
               </>
            ) : (
              <Link to="/login">
              <Button>Login</Button>
            </Link>
            )

            }
            
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNav;
