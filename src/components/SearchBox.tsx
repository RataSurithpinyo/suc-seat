'use client'
import React, { useState } from 'react'
import Multiselect from './Multiselect'
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

export default function SearchBox({ Facilities }: { Facilities: PlaceListInterface  }) {
  const [query, setQuery] = useState("")
  return (

      <div className="flex flex-col md:flex-row gap-3 mt-5 mb-6 xl:mx-80 lg:mx-52 md:mx-32 sm:mx-8 text justify-center">
        <div className="flex flex-auto">
            <input type="text" placeholder="Search for Coworking Spaces"
			    className="flex flex-grow w-full md:w-4/6 px-3 h-10 rounded-l border-2 border-gray-950 focus:outline-none focus:border-gray-950"
			    value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
            <button type="submit" className="bg-gray-950 h-10 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
        </div>
    
        {/* <select multiple id="pricingType" name="pricingType"
		    // className="flex flex-initial h-10 border-2 border-gray-950 focus:outline-none focus:border-gray-950 text-gray-950 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        className='block w-full p-3 border border-gray-300 rounded-sm cursor-pointer focus:outline-none' >
		    <option value="All" selected>All</option>
		    <option value="Freemium">Freemium</option>
		    <option value="Free">Free</option>
		    <option value="Paid">Paid</option>
	    </select> */}
      <Multiselect Facilities={Facilities}/>
    </div>
  )
}
