import React from "react";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
const useForm = (initialValues) => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    (name) => {
      if (values[name]) return values[name];
      return "";
    },
    (body) => {
      setValues(body)
    }
  ];
};

const EditUser = ({setForm,handleAlert,id}) => {
  const [values, setValues, getValue,setinitialvalues] = useForm({});
  const [profile, setprofile] = React.useState({});
  const GetMe = async () => {
    alert(id)
    let x = await API.adminShowUser(Cookies.getAuth(),id);

    setprofile(x);
    setinitialvalues({
      firstname: x.firstname,
      lastname: x.lastname,
      email: x.email,
      address: x.address,
      phone: x.phone,
    })
  };

  React.useEffect(() => {
    GetMe();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = await API.editUser( Cookies.getAuth(), {
      firstname: e.target.elements.firstname.value,
      lastname: e.target.elements.lastname.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
    });
    handleAlert({
      open:true,
      success:x.success,
      message:x.message
    })
    setForm("Account");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can recieve mail.
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={getValue("firstname")}
                  onChange={setValues}
                  autoComplete="given-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={getValue("lastname")}
                  onChange={setValues}
                  autoComplete="family-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={getValue("email")}
                  onChange={setValues}
                  autoComplete="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={getValue("address")}
                  onChange={setValues}
                  autoComplete="address"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={getValue("phone")}
                  onChange={setValues}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUser;
