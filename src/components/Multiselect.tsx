'use client'
import { list } from 'postcss';
import React, { useState } from 'react'
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
export default function Multiselect({ Facilities }: { Facilities: PlaceListInterface  }) {

    const [isChoice, setChioce] = useState(false);
    
    const uniqueFacilities: Set<string> = Facilities.place.reduce((acc, place) => {
        place.facilities.forEach(facility => {
          acc.add(facility);
        });
        return acc;
      }, new Set<string>());

      const uniqueFacilitiesArray: string[] = Array.from(uniqueFacilities);
    const [choiceList, setChoicelist] = useState(Array<string>);

  return (
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-up w-4 h-4">
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
  )
}
