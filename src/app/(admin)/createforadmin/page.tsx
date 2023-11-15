"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function CreateForAdmin() {
  const router = useRouter();
  const axios = require("axios");
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const token = localStorage.getItem("token"); // searchParams.get("token");
  const [name, setName] = useState(String);
  const [capacity, setCapacity] = useState(Number);
  const [facilityInput, setFacilityInput] = useState(String);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [availableseat, setAvailableseat] = useState(Number); // to available seats
  const [reservable, setReservable] = useState(Boolean);
  const handleSubmit = async () => {
    const url = "http://localhost:8080";
    try {
      console.log("token", token);
      const response = await axios.post(
        `${url}/upload`,
        {
          Name: name,
          Owner: username,
          Capacity: capacity,
          AvailableSeat: availableseat,
          Facilities: facilities,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response);
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        alert("created place successfully");
        router.push("/ownerhome");
      } else {
        console.error("Failed to create a place");
        alert(
          "An error has occurred. Please make sure your username and password are correct."
        );
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("An error has occurred.");
      window.location.reload();
    }
  };

  const handleReservableChange = (e: any) => {
    const value = e.target.value === "true"; // Convert string value to boolean
    setReservable(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacilityInput(e.target.value);
  };

  const addFacility = () => {
    if (facilityInput.trim() !== "") {
      setFacilities([...facilities, facilityInput]);
      setFacilityInput("");
    }
    console.log(facilities);
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

            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium leading-6 text-white"
              >
                Capacity (Seats)
              </label>
              <div className="mt-2">
                <input
                  min={0}
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
                htmlFor="currentuser"
                className="block text-sm font-medium leading-6 text-white"
              >
                Available Seats
              </label>
              <div className="mt-2">
                <input
                  min={0}
                  type="number"
                  id="currentuser"
                  name="currentuser"
                  placeholder="Enter a number"
                  value={availableseat}
                  onChange={(e) => setAvailableseat(parseInt(e.target.value))}
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="facilities"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Facilities
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="facilities"
                    value={facilityInput}
                    onChange={handleInputChange}
                    placeholder="Add a facility"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <button
                    onClick={addFacility}
                    className="block w-[40%] mt-8 rounded-md bg-amber-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add
                  </button>
                </div>
                <div></div>
              </div>
            </div>

            <div className="mt-0">
              <ul className="text-white">
                {facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
            <div>
              <label
                htmlFor="reservable"
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
                    id="reservable"
                    className="mr-2"
                    checked={reservable === true} // Check if false
                    onChange={handleReservableChange}
                  />
                  YES
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="radio"
                    value="false"
                    name="reservable"
                    className="mr-2"
                    checked={reservable === false} // Check if false
                    onChange={handleReservableChange}
                  />
                  NO
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
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
