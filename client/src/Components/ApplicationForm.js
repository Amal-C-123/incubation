import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Config/axiosBaseUrl";
import Swal from "sweetalert2";

function ApplicationForm() {
  const navigate = useNavigate();
  const [fieldsErr, setFieldsErr] = useState('')
  let error = 0;
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));
  const formValues = {
    fname: "",
    lname: "",
    email: "",
    streetAddress: "",
    city: "",
    pin: "",
    companyName: "",
    state: "",
    a: "",
    b: "",
    c: "",
    incubationType: "",
    userId: user._id,
    Status: "pending",
    Date: new Date().toLocaleDateString("en-US"),
    View: false,
  };

  const [formData, setFormData] = useState(formValues);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const prop in formData) {
      if (formData[prop] === "") {
        error++;
      }
    }

    if (!error) {
      axios
        .post("/applicationForm", formData, {
          headers: { token: `Bearer ${token}` },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Application has been submitted successfully",
            timer: 1500,
          }).then((res) => {
            navigate("/");
          });
        });
    }else{
      setFieldsErr('please fill all the fields')
      window.scrollTo(0, 0)
    }
  };

  return (
    <>
      <div className="grid grid-cols-9 container mt-20">
        <div className="mt-10 sm:mt-0 col-start-3  col-span-7 ">
          <div className="md:grid md:grid-cols-3 md:gap-6 ">
            <div className="mt-5 md:col-span-2 md:mt-0 ">
              <form onSubmit={handleSubmit}>
                <div className="overflow-hidden shadow sm:rounded-md ">
                  <div className="bg-white px-4 py-5 sm:p-6 bg-slate-100">
                    <h1 className="text-center mb-10  font-bold text-2xl lg:text-3xl">
                      Application Form
                    </h1>
                    {fieldsErr && (
            <p className=" text-center bg-red-100 text-red-800 text-xm font-semibold mr-5 ml-5 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              {fieldsErr}
            </p>
          )}
                    <div className="grid grid-cols-6 gap-6 border-black">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="fname"
                          onChange={handleChange}
                          value={formData.fname}
                          id="first-name"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10 "
                          
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lname"
                          value={formData.lname}
                          onChange={handleChange}
                          id="last-name"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                        />
                      </div>

                      <div className="col-span-6 ">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                          
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10 "
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          id="region"
                          onChange={handleChange}
                          autoComplete="address-level1"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="number"
                          name="pin"
                          value={formData.pin}
                          onChange={handleChange}
                          id="pin"
                          autoComplete="postal-code"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10 "
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                        >
                          Company name
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          autoComplete="country-name"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                          
                        />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="logo"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                        >
                          Company Logo
                        </label>
                        <input
                          type="file"
                          id="companyLogo"
                          name="companyLogo"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                        />
                      </div> */}

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          1. Describe your team and Background
                        </label>
                        <input
                          type="text-area"
                          name="a"
                          onChange={handleChange}
                          value={formData.a}
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          2. Describe your company and products
                        </label>
                        <input
                          type="text-area"
                          name="b"
                          value={formData.b}
                          id="street-address"
                          onChange={handleChange}
                          autoComplete="street-address"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          3. Describe the problem you are solving
                        </label>
                        <input
                          type="text-area"
                          name="c"
                          value={formData.c}
                          id="street-address"
                          onChange={handleChange}
                          autoComplete="street-address"
                          className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className=" text-sm font-medium text-gray-700"
                        >
                          4. Type of Incubation needed.
                        </label>
                        <br />

                        <input
                          type="radio"
                          name="incubationType"
                          id="incubationType"
                          onClick={handleChange}
                          value="Virtual Incubation"
                          className=""
                        />
                        <label
                          htmlFor="street-address"
                          className=" text-sm font-medium text-gray-700 pl-2"
                        >
                          Virtual Incubation
                        </label>
                        <br />
                        <input
                          type="radio"
                          name="incubationType"
                          id="incubationType"
                          onClick={handleChange}
                          value="Physical Incubation"
                          className=""
                        />
                        <label
                          htmlFor="street-address"
                          className=" text-sm font-medium text-gray-700 pl-2"
                        >
                          Physical Incubation
                        </label>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-center">
                        <span className="bg-sky-500">
                          <button
                            type="submit"
                            className=" bg-indigo-500 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Submit
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationForm;
