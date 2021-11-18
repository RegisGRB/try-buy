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
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React from "react";
import * as Api from "../api/api";
import { Fragment } from "react";
import {

  Menu,

  Transition,
} from "@headlessui/react";
import {

} from "@heroicons/react/outline";
import {

  ViewGridIcon,
  MapIcon,
} from "@heroicons/react/solid";
import * as API from "../api/api";
import ListGallery from "../components/Gallery/ListGallery";
import MapGallery from "../components/Gallery/MapGallery";

const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];




export default function Gallery() {
  const [products, setproducts] = React.useState([]);
  const [Mode, setMode] = React.useState("List");
  const [category, setcategory] = React.useState([]);
  const [categorySelect, setcategorySelect] = React.useState({
    _id:"",
    name:""
  });
 
  React.useEffect(async () => {
    Init()
  }, []);


  const Init = async ()=>{
    let w = await API.GetAllCateg();
    setcategory(w.category);
 
  }
 const RefreshAll= async ()=>{
   if(categorySelect.name !=""){
  let x = await Api.ShowProductsByCateg(categorySelect._id);

  setproducts(x.product ? x.product: x);
   }else{
    let x = await Api.ShowProducts("");
    setproducts(x.product);
   }
   
  }
  React.useEffect( ()=>{
    RefreshAll();
  },[categorySelect])
  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative  flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 z-0">
            {Mode === "List" ? categorySelect && categorySelect.name != "" ? categorySelect.name: "New Arrivals"  : "Product in your Zone"}
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>

              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >

              </Transition>
            </Menu>

            <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View grid</span>
              {Mode === "List" ? (
                <MapIcon className="w-5 h-5" aria-hidden="true" onClick={() => setMode("Map")} />
              ) : (
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" onClick={() => setMode("List")} />
              )}
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className={`grid grid-cols-1 ${Mode === "List" ? "lg:grid-cols-4" : ""}  gap-x-8 gap-y-10`}>
            {Mode === "List" ? (
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
            
                    <li >
                      <a href="#" onClick={()=>{setcategorySelect({
                        _id:"",
                        name:""
                      })}}>All</a>
                    </li>
            
                  {category.map((category) => (
                    <li key={category.name}>
                      <a href="#" onClick={()=>{setcategorySelect(category)}}>{category.name}</a>
                    </li>
                  ))}
                </ul>
              </form>
            ) : (
              <></>
            )}

            {/* Product grid */}
            {Mode === "List" ? (
              <ListGallery products={products}></ListGallery>
            ) : (
              <MapGallery products={products}></MapGallery>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
