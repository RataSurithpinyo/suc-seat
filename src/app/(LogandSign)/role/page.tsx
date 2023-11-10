"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Role() {
  const router = useRouter();
  return (
    <>
      <div className="mt-20 flex min-h-full flex-1 flex-col justify-normal px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <h2 className="w-[100%] mt-2 text-center text-3xl font-bold leading-9 tracking-tight text-white">
            Please select your role for this account
          </h2>
          <h3 className="w-[100%] mt-2 text-center text-base leading-9 tracking-tight text-white">
            Please choose between place's owner or user. Otherwise, you will not
            be able to create an account.
          </h3>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="text-lg mt-4 block rounded-md bg-indigo-500 hover:bg-indigo-700 px-5 py-4 text-white shadow-sm"
            onClick={() => {
              router.push("/signup?role=OWNER")}}
          >
            Admin (Place's Owner)
          </button>
          <button
            className="text-lg ml-8 mt-4 block rounded-md bg-yellow-500 hover:bg-yellow-700 px-5 py-4 text-white shadow-sm"
            onClick={() => {
              router.push("/signup?role=USER")}}
          >
            User
          </button>
        </div>
      </div>
    </>
  );
}
