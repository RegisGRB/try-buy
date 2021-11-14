import React from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
const Interrest = ({ setForm, setBuffer }) => {
  const [products, setproducts] = React.useState([]);
  const GetProduct = async () => {
    let x  = await API.GetInterrestProduct(Cookies.getAuth())
  console.log(x)
  setproducts(x)
  };

  React.useEffect(() => {
    GetProduct();
  }, []);

  return (
    <>
      <div className=" bg-white h-full w-full -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200 min-h-screen pl-10 pr-60 pt-20 flex justify-center items-center">
        <div className=" space-y-4 sm:mt-0  sm:flex-none sm:w-40 absolute  m-2">
          <h1 className="text-3xl font-extrabold  text-gray-900">Product in Interrest</h1>
          <p>En attente de validation du buyer</p>
        </div>
        <div className="mt-40">
          {products?.map((product, index) => (
            <div key={product._id} className="py-6 sm:flex" key={index}>
              <div className="flex space-x-4 w-full sm:flex-1 sm:space-x-6 lg:space-x-8 max-w-md">
                <img
                  src={product.image[0]}
                  alt=""
                  className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
                <div className="pt-1.5  flex-1 sm:pt-0 w-full">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/Product/${product._id}`}>{product.title}</a>
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    <span>{product.color}</span>{" "}
                    <span className="mx-1 text-gray-400" aria-hidden="true">
                      &middot;
                    </span>{" "}
                    <span>{product.size}</span>
                  </p>
                  <p className="mt-1 font-medium text-gray-900">{product.price} €</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Interrest;
