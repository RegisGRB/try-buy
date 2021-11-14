import React from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
const Products = ({ setForm, setBuffer }) => {
  const [products, setproducts] = React.useState([]);
  const GetProducts = async () => {
    let x = await API.ShowProducts();
    setproducts(x.product);
  };

  React.useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      <div className=" bg-white h-full w-full -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200 min-h-screen pl-40 pr-60 pt-20 flex justify-center items-center">
        <div className=" space-y-4 sm:mt-0   sm:flex-none sm:w-40 absolute  ">
          <button
            onClick={() => {
              setForm("CreateSelling");
            }}
            type="button"
            className=" w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
          >
            Create Product
          </button>
        </div>
        <div className="mt-20">
          {products.map((product, index) => (
            <div key={product.id} className="py-6 sm:flex" key={index}>
              <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8 max-w-md">
                <img
                  src={product.image[0]}
                  alt=""
                  className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
                <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
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
                  <p className="mt-1 font-medium text-gray-900">
                    {product.price} €
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                
                <button
                  onClick={() => {
                    setBuffer(product._id);
                    setForm("Products");
                  }}
                  type="button"
                  className="w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                >
                  Edit Product
                </button>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
