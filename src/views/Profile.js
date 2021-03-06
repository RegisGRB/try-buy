
import { useParams } from "react-router-dom";
import CreateProduct from "../components/DashBoard/CreateProduct";
import EditProfile from "../components/DashBoard/EditProfile";
import {
  CreditCardIcon,

  UserCircleIcon,

} from "@heroicons/react/outline";
import * as React from "react";
import ProductSelling from "../components/DashBoard/ProductSelling";
import Buyers from "../components/DashBoard/Buyers";
import Order from "../components/DashBoard/Order";
import EditProduct from "../components/DashBoard/EditProduct";
import Alert from "../components/Alert/Alert"
import Buying from "../components/DashBoard/Buying"
import PaidProduct from "../components/DashBoard/PaidProduct"
import Interrest from "../components/DashBoard/Interrest"
const navigation = [
  { name: "Account", icon: UserCircleIcon },
  { name: "Interrest", icon: CreditCardIcon },
  { name: "Selling", icon: CreditCardIcon },
  { name: "Buying", icon: CreditCardIcon },
  { name: "Paid Product", icon: CreditCardIcon },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let { dash } = useParams();

  const [form, setform] = React.useState(dash ? dash : "Account");
  const [buffer, setBuffer] = React.useState("");
  const [AlertopenStatus, setAlertopenStatus] = React.useState({
    success:true,
    open:false,
    message:""
  });

  const handleAlert = (e) =>{
    setAlertopenStatus(e)
  }
  return (
    <div className="lg:grid lg:grid-cols-12 text-black">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3 bg-white">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <span
              onClick={() => {

                setform(item.name);
              }}
              key={item.name}
              className={classNames(
                item.name === form
                  ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                "group rounded-md px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
              )}
              aria-current={item.name === form ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.name === form
                    ? "text-indigo-500 group-hover:text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </span>
          ))}
        </nav>
      </aside>

      <div className=" sm:px-6 lg:px-0 lg:col-span-9">
        <Alert openStatus={AlertopenStatus} setOpenStatus={handleAlert} ></Alert>
        {form === "Buyers" && <Buyers id={buffer} setForm={setform} handleAlert={handleAlert}></Buyers>}
        {form === "CreateSelling" && <CreateProduct setForm={setform} handleAlert={handleAlert}></CreateProduct>}
        {form === "Selling" && <ProductSelling setForm={setform} setBuffer={setBuffer}></ProductSelling>}
        {form === "Account" && (<EditProfile setForm={setform} handleAlert={handleAlert}></EditProfile>)}
        {form === "EditProduct" && (<EditProduct id={buffer} setForm={setform} handleAlert={handleAlert}></EditProduct>)}
        {form === "Order" && (<Order id={buffer}></Order>)}
        {form === "Buying" && (<Buying id={buffer} handleAlert={handleAlert}></Buying>)}
        {form === "Paid Product" && (<PaidProduct id={buffer} handleAlert={handleAlert}></PaidProduct>)}
        {form === "Interrest" && (<Interrest id={buffer} handleAlert={handleAlert}></Interrest>)}
      </div>
    </div>
  );
}
