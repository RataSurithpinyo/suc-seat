"use client"
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
// import Multiselect from '../../../../src/components/Multiselect.tsx';
interface PlaceListInterface {
  place: {
    facilities: string[];
    id: string;
    name: string;
    owner: string ;
    capacity: number ;
    availableSeat: number ;
  }[];
}
interface PlaceInterface {

    facilities: string[];
    id: string;
    name: string;
    owner: string ;
    capacity: number ;
    availableSeat: number ;

}
export default function Page() {
  const mockdata = 
  {place: 
    [
      { id: "1", name: "starback", availableSeat: 15, facilities: ["chair", "table"], capacity: 50, owner: "a" },
      { id: "2", name: "sky cafe", availableSeat: 5, facilities: ["macbook pro m2", "something", "someone", "somewhere"], capacity: 1, owner: "a" },
      { id: "3", name: "threeyarn leftcity", availableSeat: 18.25, facilities: ["mostsandwich", "Tity's noodle"], capacity: 104, owner: "a" }
    ]
  }
  const axios = require("axios");
  const [placeListInfo, setPlaceListInfo] = useState(mockdata);
  const [query, setQuery] = useState("")
   const [searchInfo, setSeachInfo] = useState("");
  // const [FacilityInfo, setFacilityInfo] = useState("");

  const url = "http://localhost:8080"; 

      // put the fetchData inside the effect
      async function fetchData() {
        const response = await axios.post(
          `${url}/search`,
          {
            name:query
          },
          {
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${localStorage.getItem('token')}`, // Uncomment if needed
            },
          }
        );
        const mappedData: PlaceListInterface = {
          place: response.data.place.map((item:PlaceInterface) => ({
            id: item.id,
            name: item.name,
            owner: item.owner,
            capacity: item.capacity,
            availableSeat: item.availableSeat,
            facilities: item.facilities,
          })),
        };
        setPlaceListInfo(mappedData)
        console.log("mapped",query);
        console.log("mapped",placeListInfo);
      }

       useEffect(() => {
        fetchData();
       }, []);
      

   

   
  return (
    <div className='flex flex-col justify-center'>
      {/* <SearchBox Facilities={placeListInfo} /> */}
      <div className="flex flex-col md:flex-row gap-3 mt-5 mb-6 xl:mx-80 lg:mx-52 md:mx-32 sm:mx-8 text justify-center">
        <div className="flex flex-auto">
            <input type="text" placeholder="Search for Coworking Spaces"
			    className="flex flex-grow w-full md:w-4/6 px-3 h-10 rounded-l border-2 border-gray-950 focus:outline-none focus:border-gray-950"
			    value={query}
          onChange={(e) => 
            setQuery(e.target.value)
          }
          />
            <button type="submit" className="bg-gray-950 h-10 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            onClick={fetchData}
            >Search</button>
        </div>
    
        {/* <select multiple id="pricingType" name="pricingType"
		    // className="flex flex-initial h-10 border-2 border-gray-950 focus:outline-none focus:border-gray-950 text-gray-950 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        className='block w-full p-3 border border-gray-300 rounded-sm cursor-pointer focus:outline-none' >
		    <option value="All" selected>All</option>
		    <option value="Freemium">Freemium</option>
		    <option value="Free">Free</option>
		    <option value="Paid">Paid</option>
	    </select> */}
      {/* <Multiselect Facilities={placeListInfo}/> */}
    </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2 self-center w-4/5">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="p-6 px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-1/5">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400">Space</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-1/5">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400">Avaliable seat</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-2/5">
                    <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400">facility</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left w-1/6">
                  <p className="block antialiased font-sans text-lg font-medium uppercase text-blue-gray-400"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                placeListInfo.place.map((PlaceItem) => (
                  
                  <tr key={PlaceItem.id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="flex items-center gap-4">
                      <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-bold">{PlaceItem.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="pl-2 block antialiased font-sans text-md font-medium text-blue-gray-600">{PlaceItem.availableSeat}</p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="w-10/12">
                      {PlaceItem.facilities.map((item) => (
                          <span className="mt-1 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ml-2  ">{item}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {/* <Link href={`/home/${Item.id}`} key={Item.id}> */}
                    <Link href={`/home/${PlaceItem.id}?name=${PlaceItem.name}&availableSeat=${PlaceItem.availableSeat}&facilities=${PlaceItem.facilities}&capacity=${PlaceItem.capacity}`} key={PlaceItem.id} >
                  <button className="bg-transparent hover:bg-gray-600 text-gray-600 font-medium hover:text-white py-2 px-4 border border-gray-950 hover:border-transparent rounded"
                   
                >
                    detail
                  </button>
                    </Link>
                  </td>
                </tr>

                    ))
                }                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
