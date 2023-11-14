'use client';
import { useRouter,useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams()
  interface PlaceInterface  {
    facilities: string[];
    id: string;
    name: string;
    owner: string ;
    capacity: number ;
    availableSeat: number ;
  }
  const name = searchParams.get('name')
  const facilitiesParam = searchParams.get('facilities');
  const facilities = facilitiesParam ? facilitiesParam.split(',') : [];
  const availableSeats = searchParams.get('availableSeats');
  const capacity = searchParams.get('capacity');


console.log("router",facilities)

    const [isModalOpen, setModalOpen] = useState(false);
    const [isReserve, setReserve] = useState(false);
    
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const reserve = () => {
        if(!isReserve){
            toggleModal()
            setReserve(!isReserve)
        } else{
            alert('You can reserve only one place!')
        }
        
    }
    //const index = Number(params.pid) - 1
    const mockdata = [
        {pid:"1", name:"starback", seat:"15", facility:["chair","table"], capacity:"50"},
        {pid:"2", name:"sky cafe", seat:"5", facility:["macbook pro m2", "something", "someone", "somewhere"], capacity:"1"},
        {pid:"3", name:"threeyarn leftcity", seat:"18.25", facility:["mostsandwich","Tity's noodle"], capacity:"104"}
      ]

  return (
    <div>
        <div id="modal" className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isModalOpen ? "visible" : "invisible"}`}></div>

  <div id="modal" className={`fixed inset-0 z-10 w-screen overflow-y-auto ${isModalOpen ? "visible translate-y-0 sm:scale-100" : "invisible translate-y-4 sm:translate-y-0 sm:scale-95"}`}>
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              {/* <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg> */}
              <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Reserve Successfully</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">You can reserve only one place at a time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button onClick={toggleModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">  
            <div className="grid grid-cols-1 md:grid-cols-3">    
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">      
                {/* <div>
                    <p className="font-bold text-gray-700 text-xl">22</p>        
                    <p className="text-gray-400">Friends</p>      
                </div>      
                <div>           
                    <p className="font-bold text-gray-700 text-xl">10</p>        
                    <p className="text-gray-400">Photos</p>      
                </div>          
                <div>           
                    <p className="font-bold text-gray-700 text-xl">89</p>        
                    <p className="text-gray-400">Comments</p>      
                </div>     */}
            </div>    
            <div className="relative">      
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">  
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 25 25" fill="currentColor"> <path clip-rule="evenodd" d="M12 2c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 12c0 2.209-3.581 4-8 4s-8-1.791-8-4c0-1.602 1.888-2.98 4.608-3.619l1.154 1.824c-.401.068-.806.135-1.178.242-3.312.949-3.453 2.109-.021 3.102 2.088.603 4.777.605 6.874-.001 3.619-1.047 3.164-2.275-.268-3.167-.296-.077-.621-.118-.936-.171l1.156-1.828c2.723.638 4.611 2.016 4.611 3.618z" fill-rule="evenodd"/></svg>
                </div>    
            </div>    
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                    {/* <button  className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  
                        Connect
                    </button>     */}
                <button onClick={reserve} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-950 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"> 
                    Reserve
                </button>    
            </div>
        </div>  
            <div className="mt-20 text-center border-b pb-12">    
                <h1 className="text-4xl font-medium text-gray-700">{name}</h1>
                <p className="font-light text-gray-600 mt-3">reservable</p>    
                <p className="mt-8 text-gray-950">Avaliable seat: {availableSeats} / {capacity}
                </p>    
                <p className="mt-2 font-semibold text-gray-950">Facilities</p>
                {facilities.map((item) => (
                    <span className="inline-flex items-center rounded-full bg-sky-900 p-3 text-md font-medium text-gray-50 ring-1 ring-inset ring-gray-500/10 ml-2 mt-3">{item}</span>
                ))}
            </div>  
            {/* <div className="mt-12 flex flex-col justify-center">    
            <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>    
            <button  className="text-indigo-500 py-2 px-4  font-medium mt-4">  Show more</button>  
            </div> */}
        </div>
        </div>
    </div>

  )
}
