import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "../../Config/axiosBaseUrl";

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [existErr, setExistErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    if (user.name === "") {
      setNameErr("enter a valid username");
    } else if (!validator.isEmail(user.email)) {
      setEmailErr("Enter a valid email");
    } else if (user.password === "") {
      setPasswordErr("enter a valid password");
    } else {
      const { name, email, password } = user;
      if (name && email && password) {
        axios.post("/signup", user).then((res) => {
          if (res.data.userExist) {
            setExistErr(res.data.message);
          } else {
            navigate("/login");
          }
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="bg-white p-16 rounded shadow-2xl w-1/3">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Create Your Account
          </h2>
          {existErr && (
            <p className=" text-center bg-red-100 text-red-800 text-xm font-semibold mr-5 ml-5 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              {existErr}
            </p>
          )}
          <form onSubmit={register}>
            <div className="space-y-5 ">
              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
                <p className="  text-red-600 text-sm font-semibold mr-5 ml-5 px-.5 py-0.5">
                  {nameErr}
                </p>
              </div>

              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
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
                  value={user.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
                <p className="  text-red-600 text-sm font-semibold mr-5 ml-5 px-.5 py-0.5">
                  {passwordErr}
                </p>
              </div>

              <button className="block w-full bg-indigo-700 hover:bg-indigo-500 p-4 rounded text-white hover:text--800 transition duration-300">
                Sign Up
              </button>

              <div className="flex items-center">
                <label className="ml-2 text-gray-700 text-sm">
                  Already have account!
                  <Link to="/login">
                    <span className="text-indigo-600 cursor-pointer">
                      {" "}
                      Login
                    </span>
                  </Link>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
