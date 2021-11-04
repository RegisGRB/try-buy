import React from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
const ProductSelling = ({ setForm, setBuffer }) => {
  const [products, setproducts] = React.useState([]);
  const GetProduct = async () => {
  let x = await API.GetOrderPaid({token:Cookies.getAuth()})
  console.log(x)
  setproducts(x.orders)
  };

  React.useEffect(() => {
    GetProduct();
  }, []);

  return (
    <>
      <div className=" bg-white h-full w-full -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200 min-h-screen pl-40 pr-60 pt-20 flex justify-center items-center">
        <div className=" space-y-4 sm:mt-0   sm:flex-none sm:w-40 absolute  ">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Paid Products
        </h1>
        </div>
        <div className="mt-20">
          {products?.map((order, index) => (
            <div key={order.product._id} className="py-6 sm:flex" key={index}>
              <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8 max-w-md">
                <img
                  src={order.product.image[0]}
                  alt=""
                  className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
                <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/Product/${order.product._id}`}>{order.product.title}</a>
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    <span>{order.product.color}</span>{" "}
                    <span className="mx-1 text-gray-400" aria-hidden="true">
                      &middot;
                    </span>{" "}
                    <span>{order.product.size}</span>
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {order.product.price} €
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductSelling;
