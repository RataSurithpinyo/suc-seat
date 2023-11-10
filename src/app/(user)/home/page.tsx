import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import React from 'react'

export default function page() {

  const mockdata = [
    {pid:"1", name:"starback", seat:"15", facility:["chair","table"]},
    {pid:"2", name:"sky cafe", seat:"5", facility:["macbook pro m2", "something", "someone", "somewhere"]},
    {pid:"3", name:"threeyarn leftcity", seat:"18.25", facility:["mostsandwich","Tity's noodle"]}
  ]
  return (
    <div className='flex flex-col justify-center'>
      <SearchBox/>
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
                mockdata.map((Item) => (
                  
                  <tr>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="flex items-center gap-4">
                      <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-bold">{Item.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="pl-2 block antialiased font-sans text-md font-medium text-blue-gray-600">{Item.seat}</p>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="w-10/12">
                      {Item.facility.map((item) => (
                          <span className="mt-1 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ml-2  ">{item}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Link href={`/home/${Item.pid}`} key={Item.pid}>
                  <button className="bg-transparent hover:bg-gray-600 text-gray-600 font-medium hover:text-white py-2 px-4 border border-gray-950 hover:border-transparent rounded">
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
