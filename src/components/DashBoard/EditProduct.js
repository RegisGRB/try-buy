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
      setValues(body);
    },
  ];
};

const EditProduct = ({ id, setForm, handleAlert }) => {
  const [values, setValues, getValue, setinitialvalues] = useForm({});
  const [categories, setCategories] = React.useState([]);
  const GetCateg = async () => {
    let x = await API.GetAllCateg();
    setCategories(x.category);
  };

  const [product, setproduct] = React.useState({});
  const GetProduct = async () => {
    let x = await API.ShowProductById(id);
    setproduct(x.product);

    setinitialvalues({
      title: x.product.title,
      description: x.product.description,
      price: x.product.price,
      color: x.product.color,
      size: x.product.size,
      categories: x.product.category,
      image1: x.product.image[0] ? x.product.image[0] : "",
      image2: x.product.image[1] ? x.product.image[1] : "",
      image3: x.product.image[2] ? x.product.image[2] : "",
    });
  };

  const DeleteProduct = async (id) => {
    let x = await API.deleteProduct(id);
    handleAlert({
      open: true,
      success: x.success,
      message: x.message,
    });
    setForm("Selling");
  };

  React.useEffect(() => {
    GetCateg();
    GetProduct();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = await API.editProduct(id, Cookies.getAuth(), {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      color: e.target.elements.color.value,
      size: e.target.elements.size.value,
      price: e.target.elements.price.value,
      category: e.target.elements.categories.value,
      image: [e.target.elements.image1.value, e.target.elements.image2.value, e.target.elements.image3.value],
    });
    handleAlert({
      open: true,
      success: x.success,
      message: x.message,
    });
    setForm("Selling");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit product</h3>
              {/* <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can recieve mail.
              </p> */}
              {product.isActive && (
                <button
                  onClick={() => {
                    DeleteProduct(product._id);
                  }}
                  type="button"
                  className="w-24 flex items-center justify-center bg-red-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  sm:flex-grow-0"
                >
                  Delete Product
                </button>
              )}
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={getValue("title")}
                  onChange={setValues}
                  autoComplete="given-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={getValue("description")}
                    onChange={setValues}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    // placeholder="you@example.com"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={getValue("price")}
                  onChange={setValues}
                  autoComplete="price"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 h-full ">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="color"
                  name="color"
                  id="color"
                  value={getValue("color")}
                  onChange={setValues}
                  autoComplete="color"
                  className="mt-1  block w-full border border-gray-300 rounded-md shadow-sm  px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                  Categories
                </label>
                <select
                  id="categories"
                  name="categories"
                  value={getValue("categories")._id}
                  onChange={setValues}
                  autoComplete="categories"
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {categories.map((el) => {
                    return <option value={el._id}>{el.name}</option>;
                  })}
                </select>
              </div>
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={getValue("size")}
                  onChange={setValues}
                  autoComplete="size"
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>XXS</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              <div className="col-span-4 sm:col-span-5 lg:col-span-5">
                <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
                  Link Image 1
                </label>
                <input
                  type="text"
                  name="image1"
                  id="image1"
                  value={getValue("image1")}
                  onChange={setValues}
                  autoComplete="image1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-4 sm:col-span-5 lg:col-span-5">
                <label htmlFor="image2" className="block text-sm font-medium text-gray-700">
                  Link Image 2
                </label>
                <input
                  type="text"
                  name="image2"
                  id="image2"
                  value={getValue("image2")}
                  onChange={setValues}
                  autoComplete="image1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-4 sm:col-span-5 lg:col-span-5">
                <label htmlFor="image3" className="block text-sm font-medium text-gray-700">
                  Link Image 3
                </label>
                <input
                  type="text"
                  name="image3"
                  id="image3"
                  autoComplete="image3"
                  value={getValue("image3")}
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

export default EditProduct;
