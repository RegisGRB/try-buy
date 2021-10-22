import React from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
const Buyers = ({ id ,setForm, handleAlert}) => {
  const [buyers, setbuyers] = React.useState([]);
  const GetBuyers = async () => {
    setbuyers(await API.GetBuyesByProduct(id, Cookies.getAuth()));

  };
  const CreateOrder = async (buyer) => {
   let x = await API.CreateOrder({buyer:buyer,product:id,token: Cookies.getAuth()});
   handleAlert({
     open:true,
     success:x.success,
     message:x.message
   })
   setForm("Selling");
  };
  React.useEffect(() => {
    GetBuyers();
  }, []);

 
  return (
    <>
      <div className=" bg-white h-full w-full -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200 min-h-screen pl-40 pr-60 pt-20 flex justify-center items-center">
        <div className="mt-20">
          <div className="flex flex-col">
            <div className="-my-2 overflow-hidden sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 text-center">
                {buyers.length <= 0 && (
                  <h1 className="text-3xl">No Buyers for now</h1>
                )}
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {buyers.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {buyers.map((person) => (
                          <tr key={person.email}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {person.firstname} {person.lastname}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {person.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {person.phone}
                              </div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className=" space-y-4 sm:mt-0   sm:flex-none sm:w-40   ">
                                <button
                                onClick={()=>{
                                  CreateOrder(person._id)
                                }}
                                  type="button"
                                  className=" w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                                >
                                  Confirm Buyer
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buyers;
