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

const EditCateg = ({setForm,handleAlert,id}) => {
  const [values, setValues, getValue,setinitialvalues] = useForm({});

  const Init = async () => {
if(id){

    let x = await API.GetCategbyId(id);
    console.log(x)
    setinitialvalues({
      name: x.category.name,
      image: x.category.image
    })
  }
  };

  React.useEffect(() => {
    Init();
  }, []);

  const DeleteCateg = async (id) =>{
   let x = await API.DeleteCategById( Cookies.getAuth(),id);
    handleAlert({
      open:true,
      success:x.success,
      message:x.message
    })
    setForm("Categories");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let x;
    if(id){
   
    x = await API.EditCategbyId( Cookies.getAuth(),id, {
      name: e.target.elements.name.value,
      image: e.target.elements.image.value,
    });
  
  }else{
       x = await API.CreateCateg( Cookies.getAuth(), {
        name: e.target.elements.name.value,
        image: e.target.elements.image.value,
      });
    }
    handleAlert({
      open:true,
      success:x.success,
      message:x.message
    })
    setForm("Categories");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                 Categorie
              </h3>
              <p className="mt-1 text-sm text-gray-500">
           
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={getValue("name")}
                  onChange={setValues}
                  autoComplete="given-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>


              <div className="col-span-4 sm:col-span-5 lg:col-span-5">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Link Image 
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  autoComplete="image"
                  value={getValue("image")}
                  onChange={setValues}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>



            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

 
 <button
   onClick={() => {
     DeleteCateg(id);
   }}
   type="button"
   className="bg-red-600 mx-10 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
 >
   Delete Categ
 </button>

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

export default EditCateg;
