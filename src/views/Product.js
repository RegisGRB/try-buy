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

import { useParams,useHistory } from "react-router-dom";
import * as Api from "../api/api";
import * as Cookies from "../api/cookies";
import Alert from "../components/Alert/Alert";

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
  let history = useHistory()
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    image: [],
  });
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [BuyerContain, setBuyerContain] = useState(true);
  const [Connected, setConnected] = useState(false);

  let { id } = useParams();

  const init = async () =>{
    let x = await Api.ShowProductById(id)
    setProduct(x.product);
    if(Cookies.getAuth()){
      setConnected(true)
      setBuyerContain(await Api.ContainBuyers(id, Cookies.getAuth()));
    }else{
      setConnected(false)
    }

  

    setSelectedColor(product.color);
    setSelectedSize(product.size);
  }
  const [AlertopenStatus, setAlertopenStatus] = React.useState({
    success:true,
    open:false,
    message:""
  });
  const handleAlert = (e) =>{
    setAlertopenStatus(e)
  }
  React.useEffect( () => {
    init()
  }, [id]);

  const handleAddBuyer = async () => {
  
    let x = await Api.AddBuyers(id, Cookies.getAuth());
     setBuyerContain(true);

     handleAlert(
       {
         success:x.success,
         open:true,
         message:"En attente de la réponse de l'annonceur"
       }
     )
   };
  return (
    <div className="bg-white">
      <main className="pt-20 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="lg:col-start-8 lg:col-span-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                {product.title}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                {product.price}€
              </p>
            </div>

          </div>
          <Alert openStatus={AlertopenStatus} setOpenStatus={handleAlert} ></Alert>

          {/* Image gallery */}
          <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              {product.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={""}
                  className={classNames(
                    index === 0
                      ? "lg:col-span-2 lg:row-span-2 w-full h-full"
                      : "hidden lg:block",
                    "rounded-lg"
                  )}
                  style={{ objectFit: "cover" }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
       
              {/* Color picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Color</h2>

                <RadioGroup
                  value={product.color}
                  onChange={product.color}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    <RadioGroup.Option
                      value={product.color}
                      className={({ active, checked }) =>
                        classNames(
                          active && checked ? "ring ring-offset-1" : "",
                          !active && checked ? "ring-2" : "",
                          "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                        )
                      }
                      style={{ backgroundColor: product.color }}
                    >
                      <RadioGroup.Label as="p" className="sr-only">
                        {product.color}
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          "h-8 w-8 border border-black border-opacity-10 rounded-full"
                        )}
                        style={{ backgroundColor: product.color }}
                      />
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>
              </div>

              {/* Size picker */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    See sizing chart
                  </a>
                </div>

                <RadioGroup
                  value={product.size}
                  onChange={product.size}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {Sizes.map((size) => (
                      <RadioGroup.Option
                        key={size}
                        value={size}
                        className={({ active, checked }) =>
                          classNames(
                            product.size === size
                              ? "cursor-pointer focus:outline-none"
                              : "opacity-25 cursor-not-allowed",
                            active
                              ? "ring-2 ring-offset-2 ring-indigo-500"
                              : "",
                            product.size === size
                              ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                            "text-black border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                          )
                        }
                        disabled={product.size != size}
                      >
                        <RadioGroup.Label as="p">{size}</RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              {!BuyerContain && (
                <button
                  onClick={() => {
                    handleAddBuyer(product._id);
              
                  }}
           
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                   Show Interest
                </button>
              )}
       {!Connected && (
                <h1
           
                  className="mt-8 w-full text-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium "
                >
                  Connecter vous pour acheter
                </h1>
              )}
          

            {/* Policies */}
            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

      </main>
    </div>
  );
}
