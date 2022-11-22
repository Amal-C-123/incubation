import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Config/axiosBaseUrl";
import { AuthContext } from "../Store/context";

function AdminLog() {
  const {setAdmin} = useContext(AuthContext)
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const doLogin = (e)=>{
    e.preventDefault();
    axios.post('/admin/login', login).then((res)=>{
      if(res.data.adminCred){
        localStorage.setItem('admin', JSON.stringify(res.data.adminCred))
        localStorage.setItem("adminToken", res.data.adminToken)
        setAdmin(res.data.adminCred)
        navigate('/admin')
      }else{
        setErrMsg(res.data.message)
          setTimeout(()=>{setErrMsg(null)},1500)
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <>
      <div className="w-full flex flex-wrap justify-center py-20">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Admin Login</p>
            
            <form onSubmit={doLogin} className="flex flex-col pt-3 md:pt-8">
            {errMsg ? (<h2 className="text-center bg-red-100 text-red-800 text-xm font-semibold mr-5 ml-5 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">{errMsg}</h2>)
                      : ''
            }
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  required
                  value={login.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Log In"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLog;
