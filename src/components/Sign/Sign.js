import React from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
import Alert from "../Alert/Alert";
import { useHistory } from "react-router";
const Sign = ({ openModale, setopenModale, success }) => {
  let history = useHistory()
  const [IsRegister, setIsRegister] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = React.useState("");
  const Login = async (e) => {
    e.preventDefault();

    let x = await API.login({
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    });
    if (x.success) {
      Cookies.Auth(x.token, x.expiration);
      setopenModale(false);
      success(true);
      setErrorMessage("")
      history.push("/Gallery");
    }else{
      setErrorMessage(x.message)
    }
  };

  const Register = async (e) => {
    e.preventDefault();

    let x = await API.register({
      lastname: e.target.elements.lastname.value,
      firstname: e.target.elements.firstname.value,
      address: e.target.elements.address.value,
      phone: e.target.elements.telephone.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    });
    if (x.success) {
      Cookies.Auth(x.token, x.expiration);
      setopenModale(false);
      success(true);
      setErrorMessage("")
    }else{
      setErrorMessage(x.message)
    }
  };

  return (
    <div className="z-40">
      {/* Sign */}

      {!IsRegister && openModale && (
        <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8 top-0 left-0 fixed z-10 min-w-full">
          <div
            className={openModale ? "z-10 min-w-full min-h-full fixed top-0 left-0 " : ""}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setopenModale(!openModale)}
          ></div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-20 px-6">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                {/* <p className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    start your 14-day free trial
                  </a>
                </p> */}
              </div>
              <form className="space-y-6 " onSubmit={Login}>
                <div className="pt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"

                      required
                      className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"

                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-red-400"> {ErrorMessage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm cursor-pointer">
                    <span
                      className="px-2 bg-white text-gray-500"
                      onClick={() => {
                        setErrorMessage("");
                        setIsRegister(!IsRegister);
                      }}
                    >
                      Register
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* REGISER */}
      {IsRegister && openModale && (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 top-0 left-0 fixed min-w-full z-10">
          <div
            className={openModale ? "z-10 min-w-full min-h-full fixed top-0 left-0 " : ""}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setopenModale(!openModale)}
          ></div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-30">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register to your account</h2>
                {/* <p className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    start your 14-day free trial
                  </a>
                </p> */}
              </div>
              <form className="space-y-6 " onSubmit={Register}>
                <div className="flex">
                  <div className="pr-2 pt-4">
                    <label htmlFor="firstname" className="block text-sm font-medium text-black">
                      Firstname
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="pl-2 pt-4">
                    <label htmlFor="lastname" className="block text-sm font-medium text-black">
                      Lastname
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-black">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-black">
                    Telephone
                  </label>
                  <div className="mt-1">
                    <input
                      id="telephone"
                      name="telephone"
                      type="number"
                      required
                      className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-red-400"> {ErrorMessage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm cursor-pointer">
                    <span
                      className="px-2 bg-white text-gray-500"
                      onClick={() => {
                        setErrorMessage("");
                        setIsRegister(!IsRegister);
                      }}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sign;
