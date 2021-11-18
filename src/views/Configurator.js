/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";

import { useParams, useHistory } from "react-router-dom";
import * as Api from "../api/api";
import * as Cookies from "../api/cookies";
import Alert from "../components/Alert/Alert";
import Canvas from "../classes/Canvas";

const policies = [
  {
    name: "International delivery",
    icon: GlobeIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

const Sizes = ["XXS", "XS", "S", "M", "L", "XL"];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    image: [],
  });

  const [BuyerContain, setBuyerContain] = useState(true);
  const [Connected, setConnected] = useState(false);

  let { id } = useParams();

  // const init = async () =>{
  //   let x = await Api.ShowProductById(id)
  //   setProduct(x.product);
  //   if(Cookies.getAuth()){
  //     setConnected(true)
  //     setBuyerContain(await Api.ContainBuyers(id, Cookies.getAuth()));
  //   }else{
  //     setConnected(false)
  //   }

  // }
  const [AlertopenStatus, setAlertopenStatus] = React.useState({
    success: true,
    open: false,
    message: "",
  });
  const handleAlert = (e) => {
    setAlertopenStatus(e);
  };
  // React.useEffect( () => {
  //   init()
  // }, [id]);

  const handleAddBuyer = async () => {
    let x = await Api.AddBuyers(id, Cookies.getAuth());
    setBuyerContain(true);

    handleAlert({
      success: x.success,
      open: true,
      message: "En attente de la réponse de l'annonceur",
    });
  };

  React.useEffect(() => {
    new Canvas();
  }, []);
  return (
    <>
      <div className="bg-white ConfigurationContainer">
        <main className="pt-20 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8 absolute z-10">
               
            <h1
              className=" font-medium text-gray-900"
              style={{fontSize:"2rem",margin:"30px"}}

              data-canvastitle={true}
            >
              Create Your Choose
            </h1>
               
               
                 {/* Order summary */}
           <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 ConfiguratorCreator"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Configurator summary
            </h2>

            <dl className="mt-6 space-y-4">
           <div className="ChooseColor">
  
           </div>


              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">250 €</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </section>
       

            <input type="color" data-canvascolorpicker={true}></input>
     
          <Alert
            openStatus={AlertopenStatus}
            setOpenStatus={handleAlert}
          ></Alert>
        </main>
      </div>
      <canvas id="CanvasConfiguration"></canvas>
    </>
  );
}
