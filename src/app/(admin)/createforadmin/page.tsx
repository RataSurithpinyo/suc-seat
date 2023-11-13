"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CreateForAdmin() {
  const router = useRouter();
  const axios = require("axios");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [facilities, setFacilities] = useState<string[]>([]);
  const handleCheckboxChange = (event:any) => {
    const { target } = event;
    const { name, checked, value} = target;
    if (checked) {
      setFacilities([...facilities, value]);
      console.log("selected facilities: ", facilities)
    } else {
      setFacilities(facilities.filter((facility) => facility !== value));
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-white">
            Create a place
          </h2>
          <h3 className="w-[100%] mt-2 text-center text-base leading-9 tracking-tight text-white">
            Please give us the information of your place.
          </h3>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-xl">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Place's Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the name you want to display for your place"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div>
              <label
                htmlFor="facilities"
                className="block text-sm font-medium leading-6 text-white"
              >
                Facilities
              </label>
              <div className="mt-2">
                <textarea
                  id="facilities"
                  name="facilities"
                  placeholder="Describe facilities at your place. For examples - 24/7 Access, Free Wi-Fi, Coffee, Power Socket, etc."
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium leading-6 text-white"
              >
                Capacity (Seats)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  placeholder="Enter a number"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value))}
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium leading-6 text-white"
              >
                Available Seats
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  placeholder="Enter a number"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="facilities"
                className="block text-sm font-medium leading-6 text-white"
              >
                Facilities
              </label>
              <div className="mt-2 text-white text-sm font-medium leading-6 flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="24/7"
                    name="24/7"
                    className="mr-2"
                    onChange={handleCheckboxChange}
                  />
                  24/7
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="Free Wi-Fi"
                    name="Free Wi-Fi"
                    className="mr-2"
                  />{" "}
                  Free Wi-Fi
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="Free Drinks & Snacks"
                    name="Free Drinks & Snacks"
                    className="mr-2"
                    onChange={handleCheckboxChange}
                  />
                  Free Drinks & Snacks
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="Power Plug"
                    name="Power Plug"
                    className="mr-2"
                    onChange={handleCheckboxChange}
                  />
                  Power Plug
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="Toilet"
                    name="Toilet"
                    className="mr-2"
                    onChange={handleCheckboxChange}
                  />
                  Toilet
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="facilities"
                className="block text-sm font-medium leading-6 text-white"
              >
                Reservable (Will users be able to book this place in advance?)
              </label>
              <div className="mt-2 text-white text-sm font-medium leading-6 flex items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="true"
                    name="reservable"
                    className="mr-2"
                  />
                  YES
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="radio"
                    value="false"
                    name="reservable"
                    className="mr-2"
                  />
                  NO
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amber-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Place
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
