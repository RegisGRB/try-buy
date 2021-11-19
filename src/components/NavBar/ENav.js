import React, { Fragment, useState } from "react";
import {
  Dialog,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";

import Sign from "../Sign/Sign";
import * as Cookies from "../../api/cookies";
import { useHistory } from "react-router-dom";
import * as API from "../../api/api";
import * as helpers from "../../utils/helpers";
const Enav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [OpenModale, setOpenModale] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [login, setlogin] = useState(Cookies.getAuth());
  const [Admin, setAdmin] = useState(false);
  const [categories, setCategories] = React.useState([]);

  let history = useHistory();

  const Disconnect = async () => {
    Cookies.Disconnect();
    handleLogin(false);
    history.push("/Gallery");
  };
  const handleOpen = (x) => {
    setOpenModale(x);
  };
  const handleLogin = (x) => {
    setlogin(x);
  };

  const GetCateg = async () => {
    let x = await API.GetAllCateg();
    console.log(x)
    setCategories(x.category);
  };
  React.useEffect(() => {
    GetCateg();
  }, []);
  const [Interrest, setInterrest] = React.useState(0);
  const handleInterrest = async () => {
    let x = await API.GetInterrestProduct(Cookies.getAuth());
    setInterrest(x.length);
  };
  const handleAdmin = async () => {
    let x = await API.isAdmin(Cookies.getAuth());
    setAdmin(x)
  };
  React.useEffect(() => {
    handleAdmin();
    handleInterrest();
  }, [login]);

  const GetCategJSX = () => {
    let i = 0;
    let index = [];
    let length = categories.length;
    let array = [];
    let x = 0;

    if (length > 0 ) {
      let j = length < 4 ? length : 4;
      while (i < j ) {
        x = Math.floor(Math.random() * Math.floor(length));
        if (!index.includes(x)) {
          array.push(
            <div key={helpers.generateKey("categ")} className="group relative text-base sm:text-sm">
              <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                <img src={categories[x].image} alt={categories[x].image} className="object-center object-cover" />
              </div>
              <a href={"/Gallery/"+categories[x]._id} className="mt-6 block font-medium text-gray-900">
                <span className="absolute z-10 inset-0" aria-hidden="true" />
                {categories[x].name}
              </a>
              <p aria-hidden="true" className="mt-1">
                Shop now
              </p>
            </div>
          );
          index.push(x);
          i++;
        }
      }
    }

    return array;
  };
  return (
    <>
      <Sign openModale={OpenModale} setopenModale={handleOpen} success={handleLogin}></Sign>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? "text-indigo-600 border-indigo-600" : "text-gray-900 border-transparent",
                              "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                            )
                          }
                        >
                          <span>{category.name}</span>
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    {!login && !Cookies.getAuth() && (
                      <a
                        onClick={() => {
                          setOpenModale(true);
                        }}
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </a>
                    )}
                    <br></br>
                    <br></br>
                    {login && Admin && (
                      <>
                        <a href="/Admin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Admin
                        </a>
                      </>
                    )}
                    <br></br>
                    <br></br>
                    {login && Cookies.getAuth() && (
                      <>
                        <a href="/Profile" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Account
                        </a>
                        <br></br>
                        <br></br>
                        <a
                          onClick={() => {
                            Disconnect();
                          }}
                          href="#"
                          alt=""
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Disconnect
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <a href="#" className="-m-2 p-2 flex items-center">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p>

          <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="h-16 flex items-center">
                <button
                  type="button"
                  className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="h-full flex space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            {/* <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute z-20 top-full inset-x-0 text-sm text-gray-500">
                              
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-white">
                                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="grid  gap-y-10  py-16">
                                      <div className=" grid grid-cols-4 gap-x-8">{GetCategJSX()}</div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition> */}
                          </>
                        )}
                      </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {!login && !Cookies.getAuth() && (
                      <a
                        onClick={() => {
                          setOpenModale(true);
                        }}
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </a>
                    )}
                    {login && Admin && (
                      <>
                        <a href="/Admin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Admin
                        </a>
                      </>
                    )}
                    {login && Cookies.getAuth() && (
                      <>
                        <a href="/Profile" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Account
                        </a>
                        <a
                          onClick={() => {
                            Disconnect();
                          }}
                          href="#"
                          alt=""
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Disconnect
                        </a>
                      </>
                    )}
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  </div>

                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="w-5 h-auto block flex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium">CAD</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="/Profile/Interrest" className="group -m-2 p-2 flex items-center">
                      <ShoppingBagIcon
                        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {Interrest}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};
export default Enav;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const navigation = {
  categories: [
    {
      // id: "Try & buy",
      // name: "Try & buy",
      featured: [
        {
          name: "Stores",
          href: "/Gallery",
        },
      ],
    },
  ],
  pages: [{ name: "Stores", href: "/Gallery" }],
};
