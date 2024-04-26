import React, { useState, useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import Loaading from "./Loading";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const schema = Yup.object().shape({
  name: Yup.string().required("This section is necessary"),
});
const Addd = () => {
  const NAvigation = useNavigate();
  const [loadings, setLoadings] = useState(false);
  const [loadinged, setLoadinged] = useState(false);
  useEffect(() => {
    let interval;
    if (loadinged) {
      interval = setTimeout(() => {
        setLoadings(false);
        NAvigation("/Addd");
      }, 2000);
    }

    return () => {
      clearTimeout(interval);
    };
  }, [loadinged]);

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "0px",
            color: "#713200",
          },
        }}
      ></Toaster>
      {loadings && <Loaading />}
      <Formik
        initialValues={{
          name: "",
          check: false,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("values");
          console.log("actions");
          try {
            setLoadings(true);
            axios
              .post("http://localhost:3000/category", values)
              .then((res) => {
                console.log(res);
                toast.success("data has been added");
                setLoadinged(true);
              })
              .catch((err) => {
                setLoadings(false);
                console.log(err);
              });
          } catch (err) {
            setLoadings(false);
            console.log(err);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              className="  bg-yellow-500 flex flex-col justify-center items-center w-full h-screen "
            >
              <div className=" bg-gray-200 flex flex-col justify-center items-center w-4/12 h-96 gap-12 shadow-sm rounded-xl shadow-gray-200">
                <div className="flex justify-start items-center  w-9/12 mx-auto gap-6">
                  <input
                    id="checkboxs"
                    type="checkbox"
                    name="check"
                    value={values.check}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFieldValue("check", e.target.value);
                    }}
                    className="w-5 bg-blue-600 h-5"
                  />
                  <label htmlFor="checkboxs" className="text-lg">
                    I'd like to Submit my name.
                  </label>
                </div>
                <span className="flex flex-col gap-4">
                  <label
                    htmlFor="names"
                    className="text-xl text-blue-600 font-semibold"
                  >
                    Name:
                  </label>
                  <Field
                    id="names"
                    name="name"
                    type="text"
                    className="w-72 h-10 pl-2 placeholder:text-lg rounded-md"
                    placeholder="Enter your name"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 -mt-4 pl-2 "
                  />
                </span>
                <div className="flex gap-7 items-end">
                  <button
                    type="submit"
                    className="w-28 h-10 rounded-xl bg-pink-700 text-white font-semibold mt-3 hover:bg-blue-600 transition-all duration-400  ease-in-out "
                  >
                    Submit
                  </button>
                  <div className="w-28 h-10  bg-white text-black rounded-xl cursor-pointer font-semibold mt-3 hover:bg-blue-500 hover:text-white flex justify-center items-center ">
                    Cancel
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Addd;
