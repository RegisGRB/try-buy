import React from "react";
import { PaperClipIcon } from "@heroicons/react/solid";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
const Order = ({ id }) => {
  const [order, setOrder] = React.useState({ order: [{}] });
  const GetOrder = async () => {
    setOrder(
      await API.GetOrderByProductId({ id: id, token: Cookies.getAuth() })
    );
  };

  React.useEffect(() => {
    GetOrder();
  }, []);

  return (
    <div className="bg-white">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Order Info
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
      </div>
      {order.order[0].buyer && (
        <div className="mt-5 border-t border-gray-200">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Buyer Info
              </h3>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].buyer.firstname +
                  " " +
                  order.order[0].buyer.lastname}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Adresse</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].buyer.address}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].buyer.phone}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].buyer.email}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Product Info
              </h3>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].product.title}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Size</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].product.size}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].product.description}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order[0].product.price}
              </dd>
            </div>



          </dl>
        </div>
      )}
    </div>
  );
};

export default Order;
