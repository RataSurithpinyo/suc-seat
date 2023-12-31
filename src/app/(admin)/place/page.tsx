import { getPlaceInfo } from "@/libs/grpc-client";
export default function Place() {
  let isAdmin = true
  let isReservable = true
  return (
    <>
      {isAdmin ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-white">
              Update your place information
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    placeholder="Enter the name you want to display for your place"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="xxx-xxx-xxxx"
                    required
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
                <div className="mt-2">
                  <textarea
                    id="facilities"
                    name="facilities"
                    placeholder="Describe facilities at your place. For examples - 24/7 Access, Free Wi-Fi, Coffee, Power Socket, etc."
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
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="available"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Current Available Seats
                </label>
                <div className="mt-2">
                  <input
                  min={0}
                  // set max to seats capacity
                  // max={document.getElementById("capacity").value}
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
                  Reservable (*If you want to make change in this field, please contact our system staff)
                </label>
                <div className="mt-2 text-white text-sm font-medium leading-6 flex items-center">
                  <label className="flex items-center">
                    <input
                      disabled
                      type="radio"
                      value="true"
                      name="reservable"
                      className="mr-2"
                    />{" "}
                    YES
                  </label>
                  <label className="flex items-center ml-4">
                    <input
                    disabled
                      type="radio"
                      value="false"
                      name="reservable"
                      className="mr-2"
                    />{" "}
                    NO
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : 
      <h2 className="mt-24 text-center text-3xl font-bold leading-9 tracking-tight text-white">
              You do not have permission to access this route.
            </h2>
      }
    </>
  );
}
