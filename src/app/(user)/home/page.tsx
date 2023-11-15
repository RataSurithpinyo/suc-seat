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

  const url = "http://localhost:8080"; 
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

//------
const [isChoice, setChioce] = useState(false);
    
const uniqueFacilities: Set<string> = placeListInfo.place.reduce((acc, place) => {
    place.facilities.forEach(facility => {
      acc.add(facility);
    });
    return acc;
  }, new Set<string>());

  const uniqueFacilitiesArray: string[] = Array.from(uniqueFacilities);
const [choiceList, setChoicelist] = useState(Array<string>);

//---------
      async function handleSearch() {
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

      async function handlefilter() {
        const response = await axios.post(
          `${url}/filter`,
          {
            facilities:choiceList
          },
          {
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${localStorage.getItem('token')}`, // Uncomment if needed
            },
          }
        );
        console.log("choiceList",choiceList)
        console.log("mappedfilter",response.data.place);
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
      }

       useEffect(() => {
        handleSearch();
       
       }, []);

       useEffect(() => {
        console.log("choiceList",choiceList)
       handlefilter();
       }, [choiceList]);
       
  return (
    <div className='flex flex-col justify-center'>

      
      {/* <SearchBox Facilities={placeListInfo} > */}
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
            onClick={handleSearch}
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



      {/* <Multiselect Facilities={placeListInfo}> */}

      <div className="w-full md:w-1/2 flex flex-col items-center mx-auto">
    <div className="w-full px-4">
        <div className="flex flex-col items-center relative">
            {/* show selected field */}
            <div className="w-full">
                <div className="h-14 p-1 flex border border-gray-200 bg-white rounded overflow-auto">
                    <div className="flex flex-auto flex-wrap">
                        {choiceList.map((selected)=>(
                            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">{selected}</div>
                            <div className="flex flex-auto flex-row-reverse">
                                <div onClick={() => {
                                    const updatedChoices = choiceList.filter(choice => choice !== selected);
                                    setChoicelist(updatedChoices);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        ))}
                        
                        
                        <div className="flex-1">
                            <input placeholder="" className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" />
                        </div>
                    </div>
                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center border-gray-200 svelte-1l8159u">
                        <div onClick={(e)=>{setChioce(!isChoice)}} className="absolute right-6 cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>


            {/* choice for select field */}
            <div className={`${isChoice ? "visible" : "invisible"} absolute shadow top-full bg-white z-40 w-full lef-0 rounded max-h-52 overflow-y-auto`}>
                <div className="flex flex-col w-full">
                    {uniqueFacilitiesArray.map((item) => (
                    <div 
                    onClick={() => {
                        if (!choiceList.includes(item)) {
                            setChoicelist(prevChoices => [...prevChoices, item]);
                        }
                    }}
                    className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                        <div className="w-full items-center flex">
                            <div className="mx-2 leading-6  ">{
                            item} </div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>

      {/* <Multiselect/> */}


    </div>

    {/* <SearchBox /> */}

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
