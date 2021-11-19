import React, { Children } from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
import StripeBuy from "./StripeBuy";

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/solid";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

export default function Example({ handleAlert }) {
  const [modal, setmodal] = React.useState(false);
  const handleModal = (e) => {
    setmodal(e);
  };
  const [products, setproducts] = React.useState([]);
  const GetOrder = async () => {
    let x = await API.GetOrderToBuy({ token: Cookies.getAuth() });
    setproducts(x.orders);
  };
  React.useEffect(() => {
    GetOrder();
  }, []);
  const [price, setprice] = React.useState(0);
  const [order, setorder] = React.useState(0);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {products.length <= 0 && (
                <li>
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Vous n'avez aucun produit en attente de paiement
                  </h1>
                </li>
              )}
              {products?.map((order) => (
                <li key={order.product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={order.product.image[0]}
                      alt={""}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={order.product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {order.product.title}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{order.product.color}</p>
                          {order.product.size ? (
                            <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{order.product.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{order.product.price}€</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1  text-sm">
                    <button
                      type="submit"
                      onClick={() => {
                        setprice(order.product.price);
                        setorder(order._id);
                        setmodal(true);
                      }}
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Checkout
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <StripeBuy setOpen={handleModal} open={modal} price={price} order={order} handleAlert={handleAlert}></StripeBuy>
    </div>
  );
}
