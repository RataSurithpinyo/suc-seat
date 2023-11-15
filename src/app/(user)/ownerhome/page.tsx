"use client";
import SearchBox from "@/components/SearchBox";
import { searchPlaces } from "@/libs/grpc-client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { all } from "axios";

export default function OwnerHome() {
  interface Place {
    id: string;
    name: string;
    availableSeat: string;
    facilities: string[];
  }

  console.log(localStorage.getItem("username"));
  const axios = require("axios");
  const router = useRouter();
  const username = localStorage.getItem("username");
  const [allPlaces, setAllPlaces] = React.useState<Place[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const places = await getAllPlaces();
        setAllPlaces(places);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (name: string) => {
    console.log("in func")
    const url = "http://localhost:8080";
    try {
      const response = await axios.delete(
        url,
        {
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("delete place successfully");
      } else {
        console.error("Failed to delete place");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("An error has occurred.");
      window.location.reload();
    }
  };

  const getAllPlaces = async () => {
    const url = `http://localhost:8080/searchbyowner?ownerName=${username}`;
    try {
      const response = await axios.get(
        url,
        // {
        //   ownerName: `${localStorage.getItem("username")}`,
        // },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // allPlaces = response.data.place;
      //console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        const allPlaces = await response.data.place;
        console.log("ougiugig", allPlaces);
        console.log("get places successfully");
        return allPlaces;
      } else {
        console.error("Failed to get places");
        alert("An error has occurred.");
        window.location.reload();
        return [];
      }
    } catch (error) {
      console.error(error);
      alert("An error has occurred.");
      window.location.reload();
      return [];
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2 self-center w-4/5">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="p-6 px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-1/5">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400">
                      Space
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-1/5">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400">
                      Available seat
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-2/5">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400">
                      FACILITIES
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-1/6">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allPlaces.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-bold">
                          {item.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="pl-2 block antialiased font-sans text-md font-medium text-blue-gray-600">
                        {item.availableSeat}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="w-10/12">
                        {item.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="mt-1 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ml-2"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <button className="mr-4 bg-transparent hover:bg-gray-600 text-gray-600 font-medium hover:text-white py-2 px-4 border border-gray-950 hover:border-transparent rounded">
                        Edit
                      </button>
                      <button
                        className="bg-transparent hover:bg-red-600 text-red-600 font-medium hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded"
                        onClick={() => handleDelete(item.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-2">
        <button
          type="submit"
          className="flex w-[20%] justify-center rounded-md bg-amber-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            router.push("/createforadmin");
          }}
        >
          Register for more place(s)
        </button>
      </div>
    </div>
  );
}
