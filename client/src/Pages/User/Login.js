import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Config/axiosBaseUrl";
import validator from 'validator'
import { AuthContext } from "../../Store/context";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
      console.log("i work");
    }
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [errMsg, setErrMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const doLogin = (e) => {
    e.preventDefault();
    if (login.password === "") {
      setPasswordErr("Enter a valid Password");
      setTimeout(() => {
        setPasswordErr('');
      }, 1000);
    }else if(!validator.isEmail(login.email)){
      setEmailErr('Enter a valid email')
      setTimeout(() => {
        setEmailErr('');
      }, 1000);
    } else {
      axios
        .post("/login", login)
        .then((res) => {
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            navigate("/");
          } else {
            setErrMsg(res.data.message);
            setTimeout(() => {
              setErrMsg(null);
            }, 1500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="bg-white p-16 rounded shadow-2xl w-1/3">
          <h2 className="text-3xl text-center font-bold mb-10 text-gray-800">
            Login
          </h2>
          {errMsg ? (
            <h2 className="text-center bg-red-100 text-red-800 text-xm font-semibold mr-5 ml-5 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              {errMsg}
            </h2>
          ) : (
            ""
          )}
          <form onSubmit={doLogin}>
            <div className="space-y-5 ">
              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  UserName
                </label>
                <input
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                  
                />
                <p className="  text-red-600 text-sm font-semibold mr-5 ml-5 px-.5 py-0.5">
                  {emailErr}
                </p>
              </div>

              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
                <p className="  text-red-600 text-sm font-semibold mr-5 ml-5 px-.5 py-0.5">
                  {passwordErr}
                </p>
              </div>

              <button className="block w-full bg-indigo-700 hover:bg-indigo-500 p-4 rounded text-white hover:text--800 transition duration-300">
                Sign In
              </button>

              <div className="flex items-center">
                <label className="ml-2 text-gray-700 text-sm">
                  Dont have account!
                  <span className="text-indigo-600 cursor-pointer ml-1">
                    <Link to="/signup">Sign Up</Link>
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
