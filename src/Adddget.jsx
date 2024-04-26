import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
const Adddget = () => {
  const [Data, setData] = useState([]);
  const [Loadings, setLoadings] = useState(false);
  const [Loadinged, setLoadinged] = useState(false);

  const navigation = useNavigate();
  const getData = () => {
    try {
      axios
        .get("http://localhost:3000/category")
        .then((res) => {
          console.log("Pratik", res);
          setData([...res.data.result]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getData();

    let interval;
    if (Loadinged) {
      interval = setTimeout(() => {
        setLoadings(false);
        navigation("/Addd");
      }, 3000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [Loadinged]);
  const delteData = (id) => {
    try {
      axios
        .delete(`http://localhost:3000/category/${id}`)
        .then((res) => {
          console.log("Pratik", res);
          toast.error("data has been deleted", {
            duration: 2000,
          });

          setLoadinged(true);
          getData();
          navigation("/Adddget");
        })
        .catch((err) => {
          setLoadings(false);
          console.log(err);
        });
    } catch (err) {
      setLoadings(false);
      console.log(err);
    }
  };
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
      />
      <div className="flex justify-end items-center mr-44 my-4">
        <button
          onClick={() => navigation("/Adddget")}
          className="w-28 h-12 p-1 bg-blue-500 text-white font-semibold rounded-lg  "
        >
          Add
        </button>
      </div>
      <table className="w-9/12 mx-auto">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th align="left" className="px-4 py-4 border border-blue-500">
              S.No
            </th>
            <th align="left" className="px-4 py-4 border border-blue-500">
              Name
            </th>
            <th align="left" className="px-4 py-4 border border-blue-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Data.map((val, i) => {
            return (
              <tr key={i}>
                <td className="px-3 py-4 border border-gray-500">{i + 1}</td>
                <td className="px-3 py-4 border border-gray-500 capitalize">
                  {val.name}
                </td>
                <td className="px-3 py-4 border border-gray-500 ">
                  <div className=" flex  justify-around">
                    <MdDeleteForever
                      onClick={() => {
                        delteData(val.id);
                      }}
                      className="text-2xl cursor-pointer hover:text-red-500"
                    />
                    <CiEdit
                      onClick={() =>
                        navigation("/Eddit", {
                          state: [val],
                        })
                      }
                      className="text-2xl cursor-pointer hover:text-blue-700"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Adddget;
